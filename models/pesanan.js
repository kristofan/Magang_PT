'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pesanan.init({
    Nama_Pemesan: DataTypes.STRING,
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
    harga: DataTypes.INTEGER,
    status: DataTypes.STRING,
    Code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pesanan',
  });
  return Pesanan;
};