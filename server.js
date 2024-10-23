const express = require('express');
const path = require('path');
const mysql = require('mysql'); // Pastikan ini ada
const session = require('express-session'); // Tambahkan ini untuk session
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const bcrypt = require('bcrypt');
const midtransClient = require('midtrans-client');
const Order = require('./models/order');
const announcementRouter = require('./routes/announcement'); 
const { sequelize } = require('./models');
const router = express.Router();


app.set('views', path.join('D:/magang/adorable_nikah/views'));

app.use('/announcement', announcementRouter);


app.set('views', __dirname + '/views'); 
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.set('view engine', 'ejs'); 
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true
}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: '',    
    database: 'adorable_nikah'
});


db.connect((err) => {
    if (err) {
        console.error('Koneksi gagal: ' + err.stack);
        return;
    }
    console.log('Koneksi ke database berhasil');
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

const midtrans = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-zo4BiJ1BYcHm8zQAYgwldbpF', 
    clientKey: 'SB-Mid-client-encxuRse_9xk0GUh' 
});






app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
    res.render('users/login', { query: req.query }); 
});




app.get('/register', (req, res) => {
    res.render('users/register'); 
});

app.get('/dashboard', (req, res) => {
    const user = {
        name: 'Kristof', 
        
    };
    res.render('users/dashboard', { user });  
});


app.get('/order', (req, res) => {
    const orderDetails = {
        JenisUndangan: 'Undangan Resmi',
        Code: '123ABC'
    };
    res.render('users/order', { ...orderDetails });
});

app.get('/success', (req, res) => {
    res.render('users/success');
});

app.get('/users', (req, res) => {

    const users = [
        { name: 'Kristof Zega', email: 'kristofanzega301@gmail.com' },
        { name: 'Kristof Zega', email: 'kristofanzega301@gmail.com' }
    ];

    
    res.render('users/index', { users });
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;

 
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).send('Kesalahan dalam database');
        }

       
        if (results.length > 0) {
            const user = results[0];

           
            const match = await bcrypt.compare(password, user.password); 
            if (match) {
                req.session.userId = user.id; 
                return res.redirect('/order'); 
            } else {
                return res.send('Password salah!');
            }
        } else {
            return res.send('Email tidak ditemukan!');
        }
    });
});


app.post('/register', (req, res) => {
    const { name, email, wa, password } = req.body;


    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheckEmail, [email], (err, results) => {
        if (err) {
            console.error('Kesalahan dalam database:', err);
            return res.status(500).send('Kesalahan dalam database');
        }

  
        if (results.length > 0) {
            return res.send('Email sudah terdaftar!');
        }

      
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Kesalahan saat hashing password:', err);
                return res.status(500).send('Kesalahan saat menyimpan pengguna');
            }

            
            const sqlInsert = 'INSERT INTO users (name, email, wa, password) VALUES (?, ?, ?, ?)';
            db.query(sqlInsert, [name, email, wa, hash], (err, results) => {
                if (err) {
                    console.error('Kesalahan saat menyimpan pengguna:', err);
                    return res.status(500).send('Kesalahan saat menyimpan pengguna');
                }

                
                return res.redirect('/?message=success');
            });
        });
    });
});

app.post('/payment', (req, res) => {
    const { orderId } = req.body; 
    const snap = new midtransClient.Snap({ isProduction: false, serverKey: 'SB-Mid-server-zo4BiJ1BYcHm8zQAYgwldbpF' });


    const transactionDetails = {
        order_id: orderId,
        gross_amount: 10000,
    };

    const itemDetails = [
        {
            id: 'item1',
            price: 10000,
            quantity: 1,
            name: 'Nama Undangan',
        },
    ];

    const snapPayload = {
        transaction_details: transactionDetails,
        item_details: itemDetails,
       
    };

    snap.createTransaction(snapPayload)
        .then((transaction) => {
          
            const transactionToken = transaction.token;
            res.render('payment', { transactionToken, pesanan: req.body }); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error processing payment: ' + error.message);
        });
});


app.post('/order', async (req, res) => {
    try {
        
        const pesanan = await Order.create({
            Nama_Pemesan: req.body.Nama_Pemesan,
            Nama_Mempelai_Pria: req.body.Nama_Mempelai_Pria,
            Nama_Panggilan_pria: req.body.Nama_Panggilan_pria,
            Ibu_pria: req.body.Ibu_pria,
            Bapak_pria: req.body.Bapak_pria,
            Nama_Mempelai_Wanita: req.body.Nama_Mempelai_Wanita,
            Nama_Panggilan_wanita: req.body.Nama_Panggilan_wanita,
            Ibu_wanita: req.body.Ibu_wanita,
            Bapak_wanita: req.body.Bapak_wanita,
            Tanggal_Akad: req.body.Tanggal_Akad,
            Alamat_akad: req.body.Alamat_akad,
            Tanggal_Resepsi: req.body.Tanggal_Resepsi,
            Alamat_resepsi: req.body.Alamat_resepsi,
            Awal_Bertemu: req.body.Awal_Bertemu,
            Saling_jatuh_cinta: req.body.Saling_jatuh_cinta,
            Memutuskan_untuk_menikah: req.body.Memutuskan_untuk_menikah,
            No_Wa: req.body.No_Wa,
            Email: req.body.Email,
            No_Rek: req.body.No_Rek,
            harga: req.body.harga, 
            status: req.body.status || 'pending', 
            Code: req.body.Code 
        });

       
        const parameter = {
            transaction_details: {
                order_id: pesanan.id, 
                gross_amount: pesanan.harga, 
            },
            customer_details: {
                first_name: pesanan.Nama_Pemesan,
                email: req.body.Email, 
            }
        };

        
        const transaction = await snap.createTransaction(parameter);
        const transactionToken = transaction.token;

        
        res.render('users/payment', { transactionToken, pesanan }); 
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).send('Error creating transaction');
    }
});

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-zo4BiJ1BYcHm8zQAYgwldbpF', 
});

app.get('/payment', async (req, res) => {
    
    const pesanan = {
        Nama_Pemesan: "Kristof",
        id: "105",
        Code: "Kristof301",
        createdAt: new Date().toISOString() 
    };

   
    let parameter = {
        "transaction_details": {
            "order_id": `order-id-${pesanan.id}`, 
            "gross_amount": 100000 
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "first_name": "Kristof",
            "last_name": "Doe", 
            "email": "kristof@example.com",
            "phone": "081234567890" 
        }
    };

    try {
        
        const transaction = await snap.createTransaction(parameter);
        const transactionToken = transaction.token;

       
        res.render('users/payment', { pesanan, transactionToken });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).send('Terjadi kesalahan saat membuat transaksi');
    }
});

router.post('/payment-callback', async (req, res) => {
    const paymentResult = req.body; 

    
    try {
       
        if (paymentResult.status === 'settlement') {
           
            await Order.update({ status: 'settlement' }, { where: { id: paymentResult.order_id } });
            
            res.redirect('/announcement');
        } else {
            
            res.redirect('/failure'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

app.post('/payment/success', (req, res) => {
    const paymentData = req.body;

    
    const orderId = paymentData.order_id;
    const transactionStatus = paymentData.transaction_status;

    
   const query = `UPDATE orders SET status = ?, transaction_status = ? WHERE id = ?`;
db.query(query, [transactionStatus, paymentData.transaction_status, orderId], (err, result) => {
    if (err) {
        console.error('Error updating order:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Payment data saved successfully' });
});

});

app.get('/announcement', (req, res) => {
    const orderId = req.query.id;
    Order.findByPk(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.render('announcement', { pesanan: order });
        })
        .catch(err => {
            console.error('Error fetching order:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});
























