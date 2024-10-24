package tlnthunt.proposal;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import static tlnthunt.proposal.ProposalStatus.*;

@Converter(autoApply = true)
public class ProposalStatusConverter implements AttributeConverter<ProposalStatus, String> {

    @Override
    public String convertToDatabaseColumn(ProposalStatus proposalStatus) {
        if (proposalStatus == null) throw new NullPointerException("proposal status is null");

        return switch (proposalStatus) {
            case ACCEPTED -> ACCEPTED.getStatus();
            case PENDING -> PENDING.getStatus();
            case DECLINED -> DECLINED.getStatus();
        };
    }

    @Override
    public ProposalStatus convertToEntityAttribute(String s) {
        if(s == null) throw new NullPointerException("proposal status is null");

        return switch (s) {
            case "accepted" -> ACCEPTED;
            case "pending" -> PENDING;
            case "declined" -> DECLINED;
            default -> null;
        };
    }
}
