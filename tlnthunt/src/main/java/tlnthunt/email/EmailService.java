package tlnthunt.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendActivationEmail(
            String to,
            String username,
            String confirmationCode,
            String subject
    ) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        String htmlContent = String.format(
                "<html><body><p>Hi, %s!</p><p>Thank you for signing up with submate.</p><p>Your confirmation code is: <strong>%s</strong></p></body></html>",
                username, confirmationCode
        );

        helper.setFrom("achrafelaffas@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }


    @Async
    public void sendProposalEmail(
            String to,
            String username,
            String projectName,
            String freelancerName,
            String subject
    ) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        String htmlContent = String.format(
                "<html><body>" + "<p>Hi, %s!</p>" +
                        "<p>You just received a new proposal for the project %s sent to you by %s </p>" +
                        "</p></body></html>",
                username,
                projectName,
                freelancerName
        );

        helper.setFrom("achrafelaffas@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

}
