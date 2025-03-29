import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../_context/CartContext';
import { useUser } from '@clerk/nextjs';
import OrderApi from '../../_utils/orderApi'
import CartApi from '../../_utils/CartApi';
const CheckoutForm = ({ amount }) => {
	const { cart, setCart } = useContext(CartContext)
	const { user } = useUser()
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrorMessage] = useState()

	const handleSubmit = async (event) => {
  event.preventDefault(); // منع التحديث التلقائي للصفحة

  if (!stripe || !elements) {
    return; // تأكد من تحميل Stripe
  }
    createOrder_();
    sendEmail();
  try {
    // 👇 تأكد من إرسال البيانات أولًا قبل متابعة الدفع
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("Error submitting elements:", submitError);
      setErrorMessage(submitError.message);
      return;
    }

    
    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
    });

    const clientSecret = await res.json();

    // 👇 تأكيد عملية الدفع بعد نجاح العناصر
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      console.error("Payment error:", result.error.message);
      setErrorMessage(result.error.message);
    } else {
      console.log("Payment successful!");
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    setErrorMessage("Something went wrong. Please try again.");
  }
};

const createOrder_=()=>{
  let productIds=[]
  cart.forEach((el)=>{
    productIds.push(el?.product?.documentId)
  })
  const data = {
			data: {
				email: user.primaryEmailAddress.emailAddress,
				username: user.fullName,
				amount,
				products: productIds
			}
		}
    OrderApi.createOrder(data).then((res) => {
			if (res) {
				cart.forEach(el => {
					CartApi.deleteItemFromCart(el?.id).then(result => {
          console.log('well done!',result)

					})
				})
			}
		})
}

const sendEmail = async () => {
		const res = await fetch('api/send-email', {
			method: 'POST',
			body: JSON.stringify({
				amount: amount,
				email: user.primaryEmailAddress.emailAddress,
				fullName: user.fullName
			})
		})
	}
	
	
	return (
		<form onSubmit={handleSubmit}>
			<div className='mx-32 md:mx-[320px] mt-12'><PaymentElement />
				<button className='w-full p-2 mt-4 text-white rounded-md bg-primary'>Submit</button>
			</div>

		</form>
	);
};

export default CheckoutForm;