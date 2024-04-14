package mk.finki.ukim.wp.lab.model.dto;

import jakarta.persistence.ManyToOne;
import lombok.Data;
import mk.finki.ukim.wp.lab.model.Country;

@Data
public class AuthorDTO {
    private String name;
    private String surname;
    private Long countryId;
}
