package tlnthunt;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import tlnthunt.category.Category;
import tlnthunt.category.CategoryRepository;
import tlnthunt.role.Role;
import tlnthunt.role.RoleRepository;

import static tlnthunt.auth.Role.CUSTOMER;
import static tlnthunt.auth.Role.FREELANCER;

@SpringBootApplication
@EnableAsync
@EnableJpaAuditing(auditorAwareRef = "auditor")
@EnableScheduling
public class Tlnthunt {
    public static void main(String[] args) {
        SpringApplication.run(Tlnthunt.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(RoleRepository roleRepository, CategoryRepository categoryRepository) {
        return args -> {
            if (roleRepository.findByName(FREELANCER.name()).isEmpty())
                roleRepository.save(Role.builder().name(FREELANCER.name()).build());

            if (roleRepository.findByName(CUSTOMER.name()).isEmpty())
                roleRepository.save(Role.builder().name(CUSTOMER.name()).build());

            if (categoryRepository.findByName("Programming & Tech").isEmpty())
                categoryRepository.save(Category.builder().name("Programming & Tech").build());

            if (categoryRepository.findByName("Video & Animation").isEmpty())
                categoryRepository.save(Category.builder().name("Video & Animation").build());

            if (categoryRepository.findByName("Marketing").isEmpty())
                categoryRepository.save(Category.builder().name("Marketing").build());

            if (categoryRepository.findByName("Writing & Translation").isEmpty())
                categoryRepository.save(Category.builder().name("Writing & Translation").build());

            if (categoryRepository.findByName("Graphics & Design").isEmpty())
                categoryRepository.save(Category.builder().name("Graphics & Design").build());
        };
    }
}