import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import roomRouter from "./routes/roomRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"


connectDB()
connectCloudinary()

const app = express()

app.use(cors())   // Enable Cross-Origin Resource Sharing

// API to listen to Stripe Webhooks
app.post('/api/stripe/webhook', express.raw({type: "application/json"}), stripeWebhooks)

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req, res) => res.send("API is Working"))

app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server Running on PORT : ${PORT}`))