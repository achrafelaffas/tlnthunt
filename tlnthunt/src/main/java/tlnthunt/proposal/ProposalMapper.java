package tlnthunt.proposal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tlnthunt.project.ProjectMapper;
import tlnthunt.user.UserResponse;

@Service
@RequiredArgsConstructor
public class ProposalMapper {

    private final ProjectMapper projectMapper;

    public Proposal toProposal(ProposalRequest request) {
        return Proposal.builder()
                .coverLetter(request.coverLetter())
                .price(request.price())
                .period(request.period())
                .status(ProposalStatus.PENDING)
                .build();
    }

    public ProposalResponse toProposalResponse(Proposal proposal) {
        return new ProposalResponse(
                proposal.getId(),
                proposal.getPeriod(),
                proposal.getCoverLetter(),
                proposal.getPrice(),
                proposal.getStatus(),
                projectMapper.toProjectResponse(proposal.getProject()),
                proposal.getCreatedDate(),
                new UserResponse(
                        proposal.getFreelancer().getId(),
                        proposal.getFreelancer().getFullName(),
                        proposal.getFreelancer().getEmail()
                )
        );
    }
}
