package tlnthunt.config;

import jakarta.annotation.Nonnull;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import tlnthunt.user.User;

import java.util.Optional;


public class ApplicationAuditAware implements AuditorAware<Long> {

    @Nonnull
    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken || auth == null || !auth.isAuthenticated())
            return Optional.empty();

        User user = (User) auth.getPrincipal();
        return Optional.of(user.getId());
    }
}
