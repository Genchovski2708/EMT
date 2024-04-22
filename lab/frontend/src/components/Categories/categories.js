import React from "react";

const Categories = (props) => {
    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Categories</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.categories && props.categories.map((category) => (
                            <tr key={category}>
                                <td>{category}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Categories;
