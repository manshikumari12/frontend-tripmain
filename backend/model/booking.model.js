// bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    checkinDate: {
        type: Date,
        required: true,
    },
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = { BookingModel};
