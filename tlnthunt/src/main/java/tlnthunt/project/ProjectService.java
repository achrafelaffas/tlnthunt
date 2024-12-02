package tlnthunt.project;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import tlnthunt.category.Category;
import tlnthunt.category.CategoryRepository;
import tlnthunt.user.User;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final CategoryRepository categoryRepository;

    public List<ProjectResponse> getAllProjects(Authentication auth) {
        User user = (User) auth.getPrincipal();

        return projectRepository.findAll().stream()
                .filter(p -> !Objects.equals(p.getCustomer().getId(), user.getId()))
                .map(projectMapper::toProjectResponse).toList();
    }

    public List<ProjectResponse> getAllProjectsByUser(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return projectRepository.findAllByCustomer(user).stream()
                .map(projectMapper::toProjectResponse).toList();
    }

    public List<ProjectResponse> getAllProjectsByCategory(Long categoryId, Authentication auth) {
        User user = (User) auth.getPrincipal();
        return projectRepository.findAllByCategoryId(categoryId).stream()
                .filter(p -> !Objects.equals(p.getCustomer().getId(), user.getId()))
                .map(projectMapper::toProjectResponse).toList();
    }

    public ProjectResponse getProjectById(Long id) {
        return projectRepository.findById(id)
                .map(projectMapper::toProjectResponse).orElseThrow();
    }

    public void createProject(@Valid ProjectRequest request, Authentication auth) {
        Project project = projectMapper.toProject(request);
        System.out.println(project);
        Category category = categoryRepository.findById(request.categoryId()).orElseThrow();
        project.setCustomer((User) auth.getPrincipal());
        project.setCategory(category);
        projectRepository.save(project);
    }

    public List<ProjectResponse> searchProjects(String keyword, Authentication auth) {
        User user = (User) auth.getPrincipal();
        return projectRepository.findAllByTitleContaining(keyword).stream()
                .filter(p -> !Objects.equals(p.getCustomer().getId(), user.getId()))
                .map(projectMapper::toProjectResponse).toList();
    }

    public void projectViews(Long id) {
        Project project = projectRepository.findById(id).orElseThrow();
        long views = project.getViews();
        project.setViews(views + 1);
        projectRepository.save(project);
    }
}
