// models/Order.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('adorable_nikah', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Order = sequelize.define('Order', {
    Nama_Pemesan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Nama_Mempelai_Pria: DataTypes.STRING,
    Nama_Panggilan_pria: DataTypes.STRING,
    Ibu_pria: DataTypes.STRING,
    Bapak_pria: DataTypes.STRING,
    Nama_Mempelai_Wanita: DataTypes.STRING,
    Nama_Panggilan_wanita: DataTypes.STRING,
    Ibu_wanita: DataTypes.STRING,
    Bapak_wanita: DataTypes.STRING,
    Tanggal_Akad: DataTypes.DATE,
    Alamat_akad: DataTypes.STRING,
    Tanggal_Resepsi: DataTypes.DATE,
    Alamat_resepsi: DataTypes.STRING,
    Awal_Bertemu: DataTypes.TEXT,
    Saling_jatuh_cinta: DataTypes.TEXT,
    Memutuskan_untuk_menikah: DataTypes.TEXT,
    No_Wa: DataTypes.STRING,
    Email: DataTypes.STRING,
    No_Rek: DataTypes.STRING,
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // Misalnya default status
    },
    Code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Ekspor model
module.exports = Order;
