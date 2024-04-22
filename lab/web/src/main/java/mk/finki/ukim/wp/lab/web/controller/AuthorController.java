package mk.finki.ukim.wp.lab.web.controller;

import mk.finki.ukim.wp.lab.model.Author;
import mk.finki.ukim.wp.lab.model.dto.AuthorDTO;
import mk.finki.ukim.wp.lab.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }
    @GetMapping
    public List<Author> getAllAuthors()
    {
        return authorService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id)
    {
        return authorService.findById(id).map(author -> ResponseEntity.ok().body(author))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Author> addAuthor(@RequestBody AuthorDTO authorDTO)
    {
        return authorService.create(authorDTO.getName(),
                        authorDTO.getSurname(),
                        authorDTO.getCountryId())
                .map(host -> ResponseEntity.ok().body(host))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Long id)
    {
        return authorService.delete(id)
                .map(host -> ResponseEntity.ok().body(host))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Author> editAuthor(@PathVariable Long id, @RequestBody AuthorDTO authorDTO)
    {
        return authorService.update(id, authorDTO.getName(), authorDTO.getSurname(), authorDTO.getCountryId())
                .map(host -> ResponseEntity.ok().body(host))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
