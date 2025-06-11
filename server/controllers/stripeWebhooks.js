import stripe from "stripe";
import Booking from "../models/Booking.js";

// API to handle stripe webhooks
export const stripeWebhooks = async(req, res) => {
    // stripe gateway initialized
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    const sig = req.headers['stripe-signature']
    let event
    
    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, PerformanceObserverEntryList.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`)
    }

    // handle event
    if(event.type === "payment_intent.succeeded"){
        const paymentIntent = event.data.object
        const paymentIntentId = paymentIntent.id
        
        // getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        })

        const {bookingId} = session.data[0].metadata

        // mark payment as paid
        await Booking.findByIdAndUpdate(bookingId, {isPaid: true, paymentMethod: "Stripe"})
    }
    else{
        console.log("Unhandled Event Type : ", event.type)        
    }
    res.json({recieved: true})
}