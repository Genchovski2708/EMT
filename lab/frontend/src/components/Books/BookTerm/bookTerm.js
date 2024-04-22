import React from "react";
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    const handleMarkAsUsed = () => {
        if (props.onMarkAsUsed) {
            props.onMarkAsUsed(props.term.id);
        }
    };
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.author.name}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>
            <td scope={"col"} className="text-right">
                <a title={"Delete"} className="btn btn-danger"
                   onClick={() => props.onDelete(props.term.id)}
                >Delete</a>
                <Link className="btn btn-info ml-2"
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}
                >Edit</Link>
                <button
                    className="btn btn-success ml-2"
                    onClick={handleMarkAsUsed}
                >
                    Mark as Used
                </button>
            </td>
        </tr>
    )
}

export default bookTerm;