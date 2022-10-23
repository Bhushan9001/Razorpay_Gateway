import React from "react";
import axios from 'axios';
function Payment() {
    const cake = {
        name: "Chocolate Cake",
        img: "https://media.bakingo.com/sq-choco-truffle-cake0005choc-AA.jpg?tr=w-320,h-320,dpr-1.5,q-70",
        price: 10
    };
    const initPayment = (data) => {
        const options = {
            key: 'rzp_test_f4HzSloCcn7DIt',
            amount: data.amount,
            currency: data.currency,
            name: cake.name,
            description: "Test Transaction",
            image: cake.img,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:3001/api/payment/paymentVerify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                    alert(data.message)
                } catch (error) {
                    console.log(error);
                }
            },
            // callback_url: "http://localhost:3001/api/payment/paymentVerify",
            // handler: function (response){
            //     alert(response.razorpay_payment_id);
            //     alert(response.razorpay_order_id);
            //     alert(response.razorpay_signature)
            // },
            prefill: {                                   //sample name,email,contact;
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };
    const handlePayment = async () => {
        try {
            const orderURL = "http://localhost:3001/api/payment/order";
            const { data } = await axios.post(orderURL, { amount: cake.price })
            console.log(data)
            initPayment(data.data)



        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="flex justify-center mt-24">
                <div className="justify-center">
                    <img src={cake.img} alt="book_img" className="rounded-md h-48 w-48"/>
                    <p className="book_name">{cake.name}</p>

                    <p className="book_price">
                        Price : <span>&#x20B9; {cake.price}</span>
                    </p>
                    <button onClick={handlePayment} className="bg-yellow-500 ml-10 w-24 rounded-lg ">
                        <h1>Buy Now!!</h1>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Payment;
