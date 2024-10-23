const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import model Order

router.get('/', async (req, res) => {
    try {
        const pesanan = await Order.findByPk(req.query.id); // Ambil ID dari query
        if (pesanan) {
            // Menggunakan path yang benar untuk view
            res.render('users/announcement', { pesanan });
        } else {
            res.status(404).send('Pesanan tidak ditemukan');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

module.exports = router;
