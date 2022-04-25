import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import "./Services.css";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("https://mysterious-coast-98724.herokuapp.com/service")
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);
    return (
        <div id="services" className="container mt-5">
            <h1 className="text-center text-primary">Our Services</h1>
            <div className="services-container">
                {services.map((service) => (
                    <Service key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Services;
