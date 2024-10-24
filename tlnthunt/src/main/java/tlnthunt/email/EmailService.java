package tlnthunt.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine engine;

    @Async
    public void sendActivationEmail(
            String to,
            String username,
            EmailTemplateName template,
            String confirmationCode,
            String subject
    ) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmation_code", confirmationCode);

        Context context = new Context();
        context.setVariables(properties);

        helper.setFrom("contact@tlnthunt.com");
        helper.setTo(to);
        helper.setSubject(subject);

        String emailTemplate = engine.process(template.name(), context);
        helper.setText(emailTemplate, true);

        mailSender.send(mimeMessage);
    }


    @Async
    public void sendPropsalEmail(
            String to,
            String username,
            String projectName,
            String freelancerName,
            String url,
            String subject,
            EmailTemplateName templateName
    ) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("freelancer_name", freelancerName);
        properties.put("url", url);
        properties.put("project_name", projectName);

        Context context = new Context();
        context.setVariables(properties);

        helper.setFrom("contact@tlnthunt.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String emailTemplate = engine.process(templateName.getName(), context);
        helper.setText(emailTemplate, true);
        mailSender.send(mimeMessage);
    }

}
