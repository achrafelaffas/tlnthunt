package tlnthunt.proposal;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("proposals")
@Tag(name = "Proposal")
@RequiredArgsConstructor
public class ProposalController {
    private final ProposalService proposalService;

    @GetMapping("{projectId}")
    public ResponseEntity<List<ProposalResponse>> getAllProposalsByProjectId(
            @PathVariable("projectId") Long projectId) {
        return ResponseEntity.ok(proposalService.getAllProposalsByProjectId(projectId));
    }

    @GetMapping("/proposal/{id}")
    public ResponseEntity<ProposalResponse> getProposalById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(proposalService.getProposalById(id));
    }

    @GetMapping("/proposals/sent")
    public ResponseEntity<List<ProposalResponse>> getSentProposals(Authentication auth) {
        return ResponseEntity.ok(proposalService.getProposalsByFreelancerId(auth));
    }

    @GetMapping("/proposals/received")
    public ResponseEntity<List<ProposalResponse>> getReceivedProposals(Authentication auth) {
        return ResponseEntity.ok(proposalService.getProposalsByCustomerId(auth));
    }

    @PostMapping
    public ResponseEntity<Void> createProposal(@RequestBody ProposalRequest proposalRequest, Authentication auth) throws MessagingException {
        proposalService.createProposal(proposalRequest, auth);
        return ResponseEntity.status(201).build();
    }

    @PutMapping("/proposals/{id}/update-status")
    public ResponseEntity<Void> updateProposalStatus(
            @RequestBody ProposalStatus status,
            @PathVariable("id") Long id
    ) {
        proposalService.updateProposalStatus(status, id);
        return ResponseEntity.accepted().build();
    }
}
