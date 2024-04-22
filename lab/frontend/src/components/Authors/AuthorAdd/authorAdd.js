import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AuthorsAdd = (props) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        countryId: props.countries.length > 0 ? props.countries[0].id : null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const { name, surname, countryId} = formData;
        props.onAddAuthor(name, surname, countryId);
        history.push("/authors");
    };

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Author name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            placeholder="Enter author name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            className="form-control"
                            id="surname"
                            name="surname"
                            placeholder="Enter author surname"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <select
                            name="countryId"
                            className="form-control"
                            onChange={handleChange}
                            defaultValue="0"
                        >
                            {props.countries.map((country) => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AuthorsAdd;
