package mk.finki.ukim.wp.lab.service.impl;

import mk.finki.ukim.wp.lab.model.Country;
import mk.finki.ukim.wp.lab.model.exceptions.CountryNotFoundException;
import mk.finki.ukim.wp.lab.repository.jpa.CountryRepository;
import mk.finki.ukim.wp.lab.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> listAll() {
        return countryRepository.findAll();
    }

    @Override
    public Optional<Country> findById(Long id) {
        return Optional.of(countryRepository.findById(id).orElseThrow(CountryNotFoundException::new));
    }

    @Override
    public Optional<Country> create(String name, String continent) {
        return Optional.of(countryRepository.save(new Country(name, continent)));
    }

    @Override
    public Optional<Country> update(Long id, String name, String continent) {
        Country country = this.findById(id).orElseThrow(CountryNotFoundException::new);
        country.setContinent(continent);
        country.setName(name);

        return Optional.of(countryRepository.save(country));
    }

    @Override
    public Optional<Country> delete(Long id) {
        Optional<Country> country = this.findById(id);
        countryRepository.deleteById(id);
        return country;
    }
}
