package tlnthunt.project;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import tlnthunt.category.Category;
import tlnthunt.common.BaseEntity;
import tlnthunt.common.Period;
import tlnthunt.proposal.Proposal;
import tlnthunt.user.User;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private double price;

    private long views = 0;
    private Level level;
    private Period period;

    @ManyToOne
    private User customer;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "project")
    private List<Proposal> proposals;
}