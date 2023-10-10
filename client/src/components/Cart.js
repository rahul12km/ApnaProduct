import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { remove } from "../store/cartSlice";
import axios from "axios";

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(0);
    products.forEach((product) => {
      setTotal((prevTotal) => prevTotal + product.price);
    });
  }, [products]);

  const removeCart = (id) => {
    dispatch(remove(id));
  };

  const BuyProduct = async () => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getkey");
    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", {
      amount: total,
    });

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Apna Product", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9315953204", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const cards = products.map((product) => {
    return (
      <div className="col-md-4 " style={{ marginBottom: "10px" }}>
        <Card key={product.id} className="h-100">
          <div className="text-center">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: "100px", height: "130px" }}
            />
          </div>

          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>INR: ₹{product.price}</Card.Text>
          </Card.Body>
          <Card.Footer style={{ background: "white" }}>
            <Button
              className="btn-space"
              variant="danger"
              onClick={() => removeCart(product.id)}
            >
              Remove Item
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <div className="d-flex flex-column align-items-center">
      {cards}

      <p className="pt-3">Total : ₹{total}</p>
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => {
          BuyProduct();
        }}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
