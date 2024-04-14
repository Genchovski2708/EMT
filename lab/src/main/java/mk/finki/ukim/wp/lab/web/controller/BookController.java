package mk.finki.ukim.wp.lab.web.controller;

import mk.finki.ukim.wp.lab.model.Author;
import mk.finki.ukim.wp.lab.model.Book;
import mk.finki.ukim.wp.lab.model.dto.BookDTO;
import mk.finki.ukim.wp.lab.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks()
    {
        return bookService.listAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id)
    {
        return bookService.findById(id).map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody BookDTO bookDTO)
    {
        return bookService.create(bookDTO.getName(),
                        bookDTO.getCategory(),
                        bookDTO.getAuthorId(),
                        bookDTO.getAvailableCopies())
                .map(host -> ResponseEntity.ok().body(host))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteHost(@PathVariable Long id)
    {
        return bookService.delete(id)
                .map(host -> ResponseEntity.ok().body(host))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/edit/{id}")
    public ResponseEntity<Book> editHost(@PathVariable Long id, @RequestBody BookDTO bookDTO)
    {
        return bookService.update(id, bookDTO.getName(), bookDTO.getCategory(), bookDTO.getAuthorId(), bookDTO.getAvailableCopies())
                .map(host -> ResponseEntity.ok().body(host))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/lowerAvailableCopies/{id}")
    public ResponseEntity<Book> lowerAvailableCopies(@PathVariable Long id) {
        return bookService.lowerAvailableCopies(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
