package mk.finki.ukim.wp.lab.model.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import mk.finki.ukim.wp.lab.model.Author;
import mk.finki.ukim.wp.lab.model.Category;

@Data
public class BookDTO {
    private String name;
    private Category category;
    private Long authorId;
    private Integer availableCopies;
}
