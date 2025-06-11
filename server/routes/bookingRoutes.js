import express from "express"
import { checkAvailabilityAPI, createBooking, getHotelBookings, getUserBookings, stripePayment } from "../controllers/bookingControllers.js"
import { protect } from "../middlewares/authMiddleware.js"

const bookingRouter = express.Router()

bookingRouter.post("/check-availability", checkAvailabilityAPI)
bookingRouter.post("/book", protect, createBooking)
bookingRouter.get("/user", protect, getUserBookings)
bookingRouter.get("/hotel", protect, getHotelBookings)

// stripe payment
bookingRouter.post("/stripe-payment", protect, stripePayment)

export default bookingRouter