package tlnthunt.project;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import tlnthunt.category.Category;
import tlnthunt.category.CategoryRepository;
import tlnthunt.user.User;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final CategoryRepository categoryRepository;

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream().map(projectMapper::toProjectResponse).toList();
    }

    public List<ProjectResponse> getAllProjectsByUser(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return projectRepository.findAllByCustomer(user).stream().map(projectMapper::toProjectResponse).toList();
    }

    public List<ProjectResponse> getAllProjectsByCategory(Long categoryId) {
        return projectRepository.findAllByCategoryId(categoryId).stream().map(projectMapper::toProjectResponse).toList();
    }

    public ProjectResponse getProjectById(Long id) {
        return projectRepository.findById(id).map(projectMapper::toProjectResponse).orElseThrow();
    }

    public void createProject(@Valid ProjectRequest request, Authentication auth) {
        Project project = projectMapper.toProject(request);
        System.out.println(project);
        Category category = categoryRepository.findById(request.categoryId()).orElseThrow();
        project.setCustomer((User) auth.getPrincipal());
        project.setCategory(category);
        projectRepository.save(project);
    }


    public List<ProjectResponse> searchProjects(String keyword) {
        return projectRepository.findAllByTitleContaining(keyword).stream()
                .map(projectMapper::toProjectResponse).toList();
    }

}
