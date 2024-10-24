package tlnthunt.proposal;

import tlnthunt.common.Period;
import tlnthunt.project.ProjectResponse;
import tlnthunt.user.UserResponse;

import java.time.LocalDateTime;

public record ProposalResponse(
        Long id,
        Period period,
        String coverLetter,
        double price,
        ProposalStatus status,
        ProjectResponse project,
        LocalDateTime created,
        UserResponse freelancer
) {
}
