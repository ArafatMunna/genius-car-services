import React from "react";
import sleeping from "../../../images/sleeping.jpg";

const NotFound = () => {
    return (
        <div>
            <h2 className="text-primary text-center">Mechanic is Sleeping</h2>
            <div className="w-50 m-auto">
                <img className="img-fluid" src={sleeping} alt="" />
            </div>
        </div>
    );
};

export default NotFound;
