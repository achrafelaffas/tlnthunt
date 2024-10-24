package tlnthunt.project;

import org.springframework.data.jpa.repository.JpaRepository;
import tlnthunt.user.User;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByCustomer(User customer);

    List<Project> findAllByCategoryId(Long categoryId);

    List<Project> findAllByTitleContaining(String keyword);
}
