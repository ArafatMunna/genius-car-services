import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const url = `http://localhost:5000/order`;
            const { data } = await axios.get(url);
            setOrders(data);
        };
        getOrders();

        /*   axios
            .get("http://localhost:5000/order")
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err)); */
    }, []);
    return (
        <div>
            <h2>Your Orders: {orders?.length}</h2>
        </div>
    );
};

export default Order;
