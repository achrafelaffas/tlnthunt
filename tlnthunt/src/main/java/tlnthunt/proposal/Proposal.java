package tlnthunt.proposal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import tlnthunt.common.BaseEntity;
import tlnthunt.common.Period;
import tlnthunt.project.Project;
import tlnthunt.user.User;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "proposals")
public class Proposal extends BaseEntity {
    private Period period;

    @Column(columnDefinition = "LONGTEXT")
    private String coverLetter;

    private double price;
    private ProposalStatus status;

    @ManyToOne
    private Project project;
    @ManyToOne
    private User freelancer;
    @ManyToOne
    private User customer;

}