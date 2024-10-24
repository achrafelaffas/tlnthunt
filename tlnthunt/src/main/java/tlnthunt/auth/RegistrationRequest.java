package tlnthunt.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegistrationRequest(
        @NotEmpty(message = "The first name is required")
        String firstname,
        @NotEmpty(message = "The last name is required")
        String lastname,
        @NotEmpty(message = "The email is required")
        @Email(message = "The email you provided is invalid")
        String email,
        @NotEmpty(message = "The password is required")
        @Size(min = 8, message = "The password should have 8 characters minimum")
        String password,
        @NotNull
        Role role
) {
}
