const Consultation = require('../models/consultation');

module.exports.renderContactForm = (req, res) => {
    res.render('contact');
};

module.exports.createConsultation = async (req, res) => {
    const consultation = new Consultation(req.body);
    await consultation.save();
    res.redirect('/')
};

module.exports.renderConsultationDetails = async (req, res) => {
    const consultations = await Consultation.find();
    res.render('consultation/consultationDetails', { consultations });
};