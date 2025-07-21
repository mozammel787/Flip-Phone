import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ product }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [success, setSuccess] = useState('')
  const [processing, setProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [clientSecret, setClientSecret] = useState("");
  const { price, productName, email, _id, productId } = product
  const navigate = useNavigate()



  useEffect(() => {
    fetch("https://resell-one.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return

    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      // console.log(error);
      toast.error(error.message)
    }

    setSuccess('')
    setProcessing(true)
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: productName,
            email: email
          },
        },
      },
    );
    if (confirmError) {
      toast.error(confirmError)
      return
    }
    if (paymentIntent.status === 'succeeded') {

      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
        productId,


      }
      fetch('https://resell-one.vercel.app/payments', {
        method: 'POST',
        headers: {
          'content-type': "application/json",
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            toast.success('Congrats your payment completed ')
            setTransactionId(paymentIntent.id)
            navigate('/paymentcomplete')
          }
        })
    }
    setProcessing(false)
  }
  return (
    <>
      <form className='mt-5' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                margin: '10px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <button className={`btn mt-5 ${!stripe || !clientSecret || processing ? "loading" : ""}`}
          type="submit"
          disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>

      </form>
      {success && <>
        <h3>Your TransactionId is <span className='font-bold'>{transactionId}</span></h3>
      </>
      }
    </>
  );
};

export default CheckoutForm;