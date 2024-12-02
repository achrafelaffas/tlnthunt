package tlnthunt.project;

import org.springframework.stereotype.Service;
import tlnthunt.user.UserResponse;

@Service
public class ProjectMapper {

    public ProjectResponse toProjectResponse(Project p) {
        return new ProjectResponse(
                p.getId(),
                p.getTitle(),
                p.getDescription(),
                p.getPrice(),
                p.getViews(),
                p.getCreatedDate(),
                p.getLevel(),
                p.getPeriod(),
                new UserResponse(
                        p.getCustomer().getId(),
                        p.getCustomer().getFullName(),
                        p.getCustomer().getEmail()
                ),
                p.getCategory().getId()
        );
    }

    public Project toProject(ProjectRequest r) {
        return Project.builder()
                .price(r.price())
                .title(r.title())
                .description(r.description())
                .level(r.level())
                .period(r.period())
                .build();
    }
}
