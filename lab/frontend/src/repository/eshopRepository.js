import axios from "../custom-axios/axios";

const EshopService = {
    fetchBooks : () => {
        return axios.get("/books");
    },
    fetchAuthors : () => {
        return axios.get("/authors");
    },
    fetchCountries : () => {
        return axios.get("/countries");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name, category, authorId, availableCopies) =>{
        return axios.post("/books/add", {
            name,
            category,
            authorId,
            availableCopies
        });
    },
    editBook:(id, name, category, authorId, availableCopies) =>{
        return axios.post(`/books/edit/${id}`, {
            name,
            category,
            authorId,
            availableCopies
        });
    },
    getBook:(id) => {
        return axios.get(`/books/${id}`);
    },
    markBookAsUsed:(id) => {
        return axios.post(`/books/lowerAvailableCopies/${id}`);
    },
    addAuthor: (name, surname, countryId) => {
        return axios.post('/authors/add', {
            name,
            surname,
            countryId
        });
    }

}

export default EshopService;