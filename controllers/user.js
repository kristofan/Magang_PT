const { User, Pesanan } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    register : async (req, res) => {
        const { name, email, password, wa } = req.body;
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            await User.create({ name, email, password: hash, wa });
            res.redirect('/login');
        } catch (error) {
            res.status(500).send(error.message);
        }
        },

    login : async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
            return res.status(401).send('No user found with this email');
            }

            const match = await bcrypt.compare(password, user.password);
            if (match) {
            req.session.user = user;
            res.redirect('/admin');
            } else {
            res.status(401).send('Incorrect password');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
        },

    dashboard : (req, res) => {
    if (req.session.user) {
        res.render('users/dashboard', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
    },

    logout : (req, res) => {
    req.session.destroy(err => {
        if (err) {
        return res.status(500).send(err.message);
        }
        res.redirect('/login');
    });
    },

    pesan : async (req, res) => {
        const { Nama_Pemesan, 
            Nama_Mempelai_Pria, 
            Nama_Panggilan_pria, 
            Ibu_pria, 
            Bapak_pria, 
            Nama_Mempelai_Wanita, 
            Nama_Panggilan_wanita,
            Ibu_wanita,
            Bapak_wanita,
            Tanggal_Akad,
            Alamat_akad,
            Tanggal_Resepsi,
            Alamat_resepsi,
            Story,
            Awal_Bertemu,
            Saling_jatuh_cinta,
            Memutuskan_untuk_menikah,
            No_Wa,
            Email,
            No_Rek,
            JenisUndangan,
            Code } = req.body;
        try {        
            let harga = 0 
            if (JenisUndangan == 'elegant') {
                harga = 10
            }
            else if(JenisUndangan == 'colorfull'){
                harga = 100000
            }
            else {
                harga = 60000
            }
            if (!JenisUndangan){
                return res.status(200).json({
                    status: false,
                    message: "Tolong pilih jenis undangan terlebih dahulu",
                    data: null
                });
            } 
            let status = "belum lunas"
            const pesanan = await Pesanan.create({Nama_Pemesan,Nama_Mempelai_Pria,Nama_Panggilan_pria,Ibu_pria,Bapak_pria,Nama_Mempelai_Wanita,Nama_Panggilan_wanita,Ibu_wanita,Bapak_wanita,Tanggal_Akad,Alamat_akad,Tanggal_Resepsi,Alamat_resepsi,Story,Awal_Bertemu,Saling_jatuh_cinta,Memutuskan_untuk_menikah,No_Wa,Email,No_Rek,harga,status,Code});
            req.session.orderData = pesanan;

            res.redirect('/payment');
        } catch (error) {
            res.status(500).send(error.message);
        }
        },
    
    getUser : async (req, res) => {
        try {
            const user = await User.findAll();
            if (!user) {
            return res.status(401).send('No user found with this email');
            }
            if (user){
                return res.status(200).json({
                    status: true,
                    message: user,
                    data: null
                });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
        }

};