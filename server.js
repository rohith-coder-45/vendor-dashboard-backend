const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRoute = require('./routes/bookings');

const app = express();

// ✅ CORS setup for Render + Vercel
app.use(cors({
  origin: '*', // For development; for production, replace '*' with your Vercel domain
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vendor-dashboard')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// ✅ Use bookings route correctly
app.use('/api/bookings', bookingsRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
