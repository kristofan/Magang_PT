const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const { User, Pesanan} = require('../models');
const moment = require('moment');
const snap = require('../midtrans_config.js');
const nodemailer = require('../utils/nodemailer');

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/dashboard', user.dashboard);
router.get('/logout', user.logout);
router.get('/register', (req, res) => res.render('users/register'));
router.get('/login', (req, res) => res.render('users/login'));
router.get('/order', (req, res) => {
    const {JenisUndangan,Code} = req.query;
    res.render('users/order',{JenisUndangan,Code})
});
router.get('/success',async (req, res) => {
    try {
        // send email
        let status = "Lunas"
        const pesanan = req.session.orderData ;
        await Pesanan.update({status},{where : {id:pesanan.id}})
        const html = await nodemailer.getHtml('announcement.ejs', {pesanan});
        nodemailer.sendMail(pesanan.Email, 'pembayaran berhasil', html);

        res.render('users/success');
    } catch (error) {
        throw error;
    }
});
    
router.get('/admin', async (req, res) => {
    res.redirect('/admin/users');
});

router.get('/admin/users', async (req, res) => {
    const users = await User.findAll();
    res.render('users/admin_user', { users });
});

router.get('/admin/orders', async (req, res) => {
    const orders = await Pesanan.findAll();
    orders.forEach(order => {
        order.formattedTanggalAkad = moment(order.Tanggal_Akad).format('YYYY-MM-DD');
        order.formattedTanggalResepsi = moment(order.Tanggal_Resepsi).format('YYYY-MM-DD');
    });
    res.render('users/admin_order', { orders });
});
router.get('/user', user.getUser);
router.post('/order', user.pesan);
router.get('/payment', async (req, res) => {
        // Data transaksi yang diambil dari body request atau database
        let orderId = 'order-id-' + new Date().getTime();
        let pesanan = req.session.orderData;
        let grossAmount = pesanan.harga; // Contoh total pembayaran
        let parameter = {
            "transaction_details": {
                "order_id": orderId,
                "gross_amount": grossAmount
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": pesanan.Nama_Pemesan,
                "last_name": "",
                "email": pesanan.Email,
                "phone": pesanan.No_Wa
            }
        };

        try {
            let transaction = await snap.createTransaction(parameter);
            let transactionToken = transaction.token;
            req.session.transaction = transactionToken;
            const user = req.session.userData ;
            const pesanan = req.session.orderData ;
            // Kirim token ke halaman view untuk digunakan di Snap.js
            res.render('users/payment', { transactionToken,user,pesanan });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

router.get('/test/mailer', async (req, res) => {
    try {
        // send email
        const html = await nodemailer.getHtml('announcement.ejs', {pesanan: {Nama_Pemesan: 'Dinda'}});
        nodemailer.sendMail('dindadt1305@gmail.com', 'pembayaran berhasil', html);

        return res.status(200).json({
            status: true,
            message: 'success',
            data: null
        });
    } catch (error) {
        throw error;
    }
});


module.exports = router;
