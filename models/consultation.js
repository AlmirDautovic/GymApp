const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    requestConsultation: {
        type: Boolean,
        enum: [true, false],
        default: true
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    birth_date: {
        type: String
    },
    trainings_per_week: {
        type: String
    },
    training_duration: {
        type: String
    },
    weekly_training_goals: {
        type: String
    },
    fitness_goals: {
        type: String
    },
    trainig_schedule: {
        type: String
    },
    mesage: {
        type: String
    },
    information_source: {
        type: String
    },
    userId: {
        type: String,
        default: "null"
    }
});

const Consultation = mongoose.model('Consultation', consultationSchema);
module.exports = Consultation;