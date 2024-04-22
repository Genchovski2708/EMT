import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const BookEdit = (props) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        authorId: "",
        availableCopies: 0
    });

    useEffect(() => {
        // Set initial form data from props when component mounts
        if (props.book) {
            setFormData({
                name: props.book.name || "",
                category: props.book.category || "",
                authorId: props.book.author ? props.book.author.id : "",
                availableCopies: props.book.availableCopies || 0
            });
        }
    }, [props.book]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const authorId = formData.authorId;
        const availableCopies = formData.availableCopies;

        props.onEditProduct(props.book.id, name, category, authorId, availableCopies);
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
                            value={formData.name}
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
                            value={formData.availableCopies}
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
                            value={formData.authorId}
                        >
                            {props.authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name} {author.surname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BookEdit;
