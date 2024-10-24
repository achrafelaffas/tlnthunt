package tlnthunt.proposal;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import tlnthunt.email.EmailService;
import tlnthunt.email.EmailTemplateName;
import tlnthunt.project.ProjectRepository;
import tlnthunt.user.User;

import java.util.List;

import static tlnthunt.email.EmailTemplateName.PROPOSAL_NOTIFICATION_EMAIL;

@Service
@RequiredArgsConstructor
public class ProposalService {
    private final ProposalRepository proposalRepository;
    private final ProposalMapper proposalMapper;
    private final ProjectRepository projectRepository;
    private final EmailService emailService;

    public List<ProposalResponse> getAllProposalsByProjectId(Long projectId) {
        return proposalRepository.findAllByProjectId(projectId).stream().map(proposalMapper::toProposalResponse).toList();
    }

    public List<ProposalResponse> getProposalsByFreelancerId(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return proposalRepository.findAllByFreelancerId(user.getId()).stream().map(proposalMapper::toProposalResponse).toList();
    }

    public ProposalResponse getProposalById(Long id) {
        return proposalRepository.findById(id).map(proposalMapper::toProposalResponse).orElseThrow();
    }

    public List<ProposalResponse> getProposalsByCustomerId(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return proposalRepository.findAllByCustomerId(user.getId()).stream().map(proposalMapper::toProposalResponse).toList();
    }

    public void createProposal(@Valid ProposalRequest request, Authentication auth) throws MessagingException {
        Proposal proposal = proposalMapper.toProposal(request);
        projectRepository.findById(request.projectId()).ifPresent(proposal::setProject);
        User user = (User) auth.getPrincipal();
        proposal.setFreelancer(user);
        proposal.setCustomer(proposal.getProject().getCustomer());
        sendPropsalEmail(proposalRepository.save(proposal));
    }

    public void updateProposalStatus(ProposalStatus status, Long id) {
        Proposal proposal = proposalRepository.findById(id).orElseThrow();
        proposal.setStatus(status);
        proposalRepository.save(proposal);
    }

    public void sendPropsalEmail(Proposal p) throws MessagingException {
        String to = p.getCustomer().getEmail();
        String username = p.getCustomer().getFullName();
        String projectName = p.getProject().getTitle();
        String freelancerName = p.getFreelancer().getFullName();
        String url = " http://localhost:5173/proposals/" + p.getId() + "/details";
        String subject = "You've just received a proposal from " + freelancerName;
        emailService.sendPropsalEmail(to, username, projectName, freelancerName, url, subject, PROPOSAL_NOTIFICATION_EMAIL);
    }
}
