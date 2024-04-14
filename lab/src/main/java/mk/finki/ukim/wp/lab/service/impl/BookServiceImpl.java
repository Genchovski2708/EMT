package mk.finki.ukim.wp.lab.service.impl;

import mk.finki.ukim.wp.lab.model.Author;
import mk.finki.ukim.wp.lab.model.Book;
import mk.finki.ukim.wp.lab.model.Category;
import mk.finki.ukim.wp.lab.model.exceptions.BookNotFoundException;
import mk.finki.ukim.wp.lab.repository.jpa.BookRepository;
import mk.finki.ukim.wp.lab.service.AuthorService;
import mk.finki.ukim.wp.lab.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorService authorService;

    public BookServiceImpl(BookRepository bookRepository, AuthorService authorService) {
        this.bookRepository = bookRepository;
        this.authorService = authorService;
    }

    @Override
    public List<Book> listAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return Optional.of(bookRepository.findById(id).orElseThrow(BookNotFoundException::new));
    }

    @Override
    public Optional<Book> create(String name, Category category, Long authorId, Integer availableCopies) {
        Author author = authorService.findById(authorId).get();

        return Optional.of(bookRepository.save(new Book(name, category, author, availableCopies )));
    }

    @Override
    public Optional<Book> update(Long id, String name, Category category, Long authorId, Integer availableCopies) {
        Book book = this.findById(id).get();
        Author author = authorService.findById(authorId).get();
        book.setAuthor(author);
        book.setName(name);
        book.setCategory(category);
        book.setAvailableCopies(availableCopies);

        return Optional.of(bookRepository.save(book));
    }

    @Override
    public Optional<Book> delete(Long id) {
        Optional<Book> book = this.findById(id);
        bookRepository.deleteById(id);
        return book;
    }

    @Override
    public Optional<Book> lowerAvailableCopies(Long id) {
        Book book = this.findById(id).get();
        book.setAvailableCopies(book.getAvailableCopies()-1);
        bookRepository.save(book);
        return Optional.of(book);
    }
}
