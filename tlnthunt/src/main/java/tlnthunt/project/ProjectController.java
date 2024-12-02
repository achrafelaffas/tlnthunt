package tlnthunt.project;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("projects")
@RequiredArgsConstructor
@Tag(name = "Project")
public class ProjectController {

    private final ProjectService service;
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects(Authentication auth) {
        return ResponseEntity.ok(service.getAllProjects(auth));
    }

    @GetMapping("/projects-by-user")
    public ResponseEntity<List<ProjectResponse>> getAllProjectsByUser(Authentication auth) {
        return ResponseEntity.ok(service.getAllProjectsByUser(auth));
    }

    @GetMapping("/projects-by-category/{id}")
    public ResponseEntity<List<ProjectResponse>> getAllProjectsByCategory(
            @PathVariable Long id,
            Authentication auth
    ) {
        return ResponseEntity.ok(service.getAllProjectsByCategory(id, auth));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createProject(
            Authentication auth,
            @RequestBody @Valid ProjectRequest request
    ) {
        service.createProject(request, auth);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<ProjectResponse>> searchProjects(
            @PathVariable String keyword,
            Authentication auth
    ) {
        return ResponseEntity.ok(service.searchProjects(keyword, auth));
    }

    @GetMapping("/add-view/{id}")
    public ResponseEntity<Void> addProjectView(@PathVariable("id") Long id) {
        projectService.projectViews(id);
        return ResponseEntity.status(201).build();
    }
}