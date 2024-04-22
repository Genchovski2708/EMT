package mk.finki.ukim.wp.lab.service.impl;

import mk.finki.ukim.wp.lab.model.Author;
import mk.finki.ukim.wp.lab.model.Country;
import mk.finki.ukim.wp.lab.model.exceptions.AuthorNotFoundException;
import mk.finki.ukim.wp.lab.repository.jpa.AuthorRepository;
import mk.finki.ukim.wp.lab.service.AuthorService;
import mk.finki.ukim.wp.lab.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final CountryService countryService;

    public AuthorServiceImpl(AuthorRepository authorRepository, CountryService countryService) {
        this.authorRepository = authorRepository;
        this.countryService = countryService;
    }

    @Override
    public List<Author> listAll() {
        return authorRepository.findAll();
    }

    @Override
    public Optional<Author> findById(Long id) {
        return Optional.of(authorRepository.findById(id).orElseThrow(AuthorNotFoundException::new));
    }

    @Override
    public Optional<Author> create(String name, String surname, Long countryId) {
        Country country = countryService.findById(countryId).get();

        return Optional.of(authorRepository.save(new Author(name, surname, country)));
    }

    @Override
    public Optional<Author> update(Long id, String name, String surname, Long countryId) {
        Author author = this.findById(id).get();

        Country country = countryService.findById(countryId).get();

        author.setCountry(country);
        author.setName(name);
        author.setSurname(surname);

        return Optional.of(authorRepository.save(author));
    }

    @Override
    public Optional<Author> delete(Long id) {
        Optional<Author> author = this.findById(id);
        authorRepository.deleteById(id);

        return author;
    }
}
