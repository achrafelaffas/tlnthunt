package tlnthunt.project;

import tlnthunt.common.Period;
import tlnthunt.user.UserResponse;

import java.time.LocalDateTime;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        double price,
        LocalDateTime posted,
        Level level,
        Period period,
        UserResponse customer
) {
}