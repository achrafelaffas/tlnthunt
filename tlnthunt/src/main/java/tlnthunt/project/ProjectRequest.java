package tlnthunt.project;

import jakarta.validation.constraints.*;
import tlnthunt.common.Period;

public record ProjectRequest(
        @NotNull(message = "Title cannot be null")
        @NotEmpty(message = "Title cannot be empty")
        @Size(min = 20, message = "Title must be at least 20 characters long")
        String title,

        @NotNull(message = "Description cannot be null")
        @NotEmpty(message = "Description cannot be empty")
        @Size(min = 200, message = "Description must be at least 200 characters long")
        String description,

        @NotNull(message = "The price is required")
        @Max(value = 10000, message = "Maximum price is $10,000.00")
        @Min(value = 50, message = "Minimum price is $50.00")
        double price,

        @NotNull(message = "The level is required")
        Level level,

        @NotNull(message = "The period is required")
        Period period,

        @NotNull(message = "The category id is required")
        Long categoryId
) {
}