package tlnthunt.proposal;

import jakarta.validation.constraints.*;
import tlnthunt.common.Period;

public record ProposalRequest(
        @NotNull(message = "The period is required")
        Period period,

        @NotNull(message = "Cover letter cannot be null")
        @NotEmpty(message = "Cover letter cannot be empty")
        @Size(min = 200, message = "Cover letter must be at least 200 characters long")
        String coverLetter,

        @NotNull(message = "The price is required")
        @Max(value = 10000, message = "Maximum price is $10,000.00")
        @Min(value = 50, message = "Minimum price is $50.00")
        double price,

        @NotNull(message = "Project id is required")
        Long projectId
) {
}
