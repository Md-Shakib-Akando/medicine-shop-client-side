import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UseAuth from '../../../UseAuth';
import { useNavigate } from 'react-router';

const CheckOutForm = ({ totalPrice, cart }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = UseAuth();
    const navigate = useNavigate();



    useEffect(() => {
        if (totalPrice > 0) {
            axios.post('http://localhost:5000/create-payment-intent', { subTotal: totalPrice })
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => console.error('Failed to get client secret:', err));
        }
    }, [totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!stripe || !elements) return;

        setLoading(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Card element not found');
            setLoading(false);
            return;
        }


        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous',
            },
        });

        if (methodError) {
            setError(methodError.message);
            setLoading(false);
            return;
        }


        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            console.log("Cart data before sending to server:", cart)
            const payment = {
                email: user?.email,
                totalprice: totalPrice,
                price: cart.map(item => item.price),
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                name: cart.map(item => item.itemName),
                image: cart.map(item => item.image),
                quantity: cart.map(item => item.quantity),
                sellerEmail: cart.map(item => item.sellerEmail),
                menuItemIds: cart.map(item => item.cartId),
                status: 'Pending',
            };

            try {
                const res = await axios.post('http://localhost:5000/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    navigate(`/invoice/${paymentIntent.id}`);
                } else {
                    setError('Payment recorded but invoice creation failed.');
                }
            } catch (err) {
                console.error(err);
                setError('Payment succeeded but saving data failed.');
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
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
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {transactionId && <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-[#008c94] text-white py-2 rounded mt-2 transition hover:bg-[#00727a]"
            >
                {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
            </button>
        </form>
    );
};

export default CheckOutForm;
