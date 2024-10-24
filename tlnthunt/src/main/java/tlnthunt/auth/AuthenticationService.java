package tlnthunt.auth;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tlnthunt.email.EmailService;
import tlnthunt.role.RoleRepository;
import tlnthunt.security.JwtService;
import tlnthunt.user.Token;
import tlnthunt.user.TokenRepository;
import tlnthunt.user.User;
import tlnthunt.user.UserRepository;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import static tlnthunt.auth.Role.FREELANCER;
import static tlnthunt.email.EmailTemplateName.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void register(@Valid RegistrationRequest request) throws MessagingException {
        var role = roleRepository.findByName(FREELANCER.name())
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));

        var user = User.builder()
                .email(request.email())
                .password(encoder.encode(request.password()))
                .firstname(request.firstname())
                .lastname(request.lastname())
                .enabled(false)
                .locked(false)
                .roles(List.of(role))
                .build();

        userRepository.save(user);
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateActivationToken(user);
        emailService.sendActivationEmail(
                user.getEmail(),
                user.getFullName(),
                ACTIVATION_EMAIL,
                newToken,
                "Activate your account"
        );
    }

    private String generateActivationToken(User user) {
        String code = generateActivationCode();
        tokenRepository.save(Token.builder()
                .token(code).user(user)
                .expires(LocalDateTime.now().plusMinutes(10))
                .created(LocalDateTime.now())
                .build()
        );
        return code;
    }

    private String generateActivationCode() {
        String characters = "0123456789";
        int length = characters.length();
        StringBuilder code = new StringBuilder(6);
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < 6; i++) {
            code.append(characters.charAt(random.nextInt(length)));
        }
        return code.toString();
    }

    public void activate(String token) throws MessagingException {
        var savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Token not found"));

        if (LocalDateTime.now().isAfter(savedToken.getExpires())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Token is expired");
        }

        var user = userRepository.findByEmail(savedToken.getUser().getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setVerified(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullname", user.getFullName());

        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return new AuthenticationResponse(jwtToken);
    }
}
