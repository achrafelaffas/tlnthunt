package tlnthunt.project;

import tlnthunt.common.Period;
import tlnthunt.user.UserResponse;

import java.time.LocalDateTime;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        double price,
        long views,
        LocalDateTime posted,
        Level level,
        Period period,
        UserResponse customer,
        Long categoryId
) {
}