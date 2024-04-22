import './App.css';
import React, {Component} from "react";
import Books from "../Books/BookList/books";
import EshopService from "../../repository/eshopRepository";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Countries from "../Countires/countries";
import Authors from "../Authors/AuthorList/authors";
import Header from "../Header/header";
import BookAdd from "../Books/BookAdd/bookAdd";
import Categories from "../Categories/categories";
import BookEdit from "../Books/BookEdit/bookEdit";
import AuthorAdd from "../Authors/AuthorAdd/authorAdd";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            countries: [],
            authors: [],
            categories: [],
            selectedBook: {}
        }
    }
    render() {
        return(
            <Router>
                <Header/>
                    <main>
                        <div className="container">
                            <Switch>
                                <Route path="/books/add" exact render={() => <BookAdd books={this.state.books}
                                                                                      authors={this.state.authors}
                                                                                      categories={this.state.categories}
                                                                                        onAddBook={this.addBook}/>} />
                                <Route path="/books/edit/:id" exact render={() => <BookEdit books={this.state.books}
                                                                                      authors={this.state.authors}
                                                                                      categories={this.state.categories}
                                                                                      onEditProduct={this.editBook}
                                                                                            book={this.state.selectedBook}/>} />

                                <Route path="/books" exact render={() =>
                                    <Books
                                        books={this.state.books}
                                        onDelete={this.deleteBook}
                                        onEdit={this.getBook}
                                        onMarkAsUsed={this.markBookAsUsed} // Ensure this line is added
                                    />}
                                />

                                <Route path="/categories" exact render={() => <Categories categories={this.state.categories} />} />
                                <Route path="/countries" exact render={() => <Countries countries={this.state.countries} />} />
                                <Route path="/authors/add" exact render={() => <AuthorAdd books={this.state.books}
                                                                                      authors={this.state.authors}
                                                                                      countries={this.state.countries}
                                                                                      onAddAuthor={this.addAuthor}/>} />
                                <Route path="/authors" exact render={() => <Authors authors={this.state.authors} addAuthor={this.addAuthor} />} />
                                <Redirect to="/books" />
                            </Switch>
                        </div>
                    </main>
            </Router>
        );
    }

    loadBooks = () => {
        EshopService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }
    loadAuthors = () => {
        EshopService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }
    loadCountries = () => {
        EshopService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            })
    }
    loadCategories = () => {
        EshopService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }


    deleteBook = (id) =>{
        EshopService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name, category, authorId, availableCopies) =>{
        EshopService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }
    getBook = (id) =>{
        EshopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }
    editBook = (id,name, category, authorId, availableCopies) =>{
        EshopService.editBook(id,name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    markBookAsUsed = (id) => {
        EshopService.markBookAsUsed(id).then(() => {
            this.loadBooks();
        });
    };

    addAuthor = (name, surname, countryId) => {
        EshopService.addAuthor(name, surname, countryId)
            .then(() => {
                this.loadAuthors();
            })
    }

    componentDidMount() {
        this.loadBooks();
        this.loadAuthors();
        this.loadCountries();
        this.loadCategories();
    }
}
export default App;
