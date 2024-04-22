import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const BookAdd = (props) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "Book",
        category: "NOVEL",
        authorId: props.authors.length > 0 ? props.authors[0].id : null,
        availableCopies: 0
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const { name, category, authorId, availableCopies } = formData;
        props.onAddBook(name, category, authorId, availableCopies);
        history.push("/books");
    };

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            placeholder="Enter book name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={handleChange}
                            value={formData.category}
                        >
                            {props.categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="availableCopies"
                            placeholder="Quantity"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select
                            name="authorId"
                            className="form-control"
                            onChange={handleChange}
                            defaultValue="0"
                        >
                            {props.authors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name} {author.surname}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BookAdd;
