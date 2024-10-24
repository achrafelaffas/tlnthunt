package tlnthunt.proposal;

import lombok.Getter;

@Getter
public enum ProposalStatus {
    PENDING("pending"), ACCEPTED("accepted"), DECLINED("declined");

    private final String status;

    ProposalStatus(String status) {
        this.status = status;
    }
}
