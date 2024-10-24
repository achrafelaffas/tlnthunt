package tlnthunt.proposal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    List<Proposal> findAllByProjectId(Long projectId);
    List<Proposal> findAllByFreelancerId(Long freelancerId);
    List<Proposal> findAllByCustomerId(Long customerId);
}
