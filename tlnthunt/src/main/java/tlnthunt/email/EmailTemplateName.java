package tlnthunt.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACTIVATION_EMAIL("activation_email"),
    PROPOSAL_NOTIFICATION_EMAIL("proposal_notification_email");
    private final String name;
    EmailTemplateName(String name) {
        this.name = name;
    }
}
