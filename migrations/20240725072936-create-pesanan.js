'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nama_Pemesan: {
        type: Sequelize.STRING
      },
      Nama_Mempelai_Pria: {
        type: Sequelize.STRING
      },
      Nama_Panggilan_pria: {
        type: Sequelize.STRING
      },
      Ibu_pria: {
        type: Sequelize.STRING
      },
      Bapak_pria: {
        type: Sequelize.STRING
      },
      Nama_Mempelai_Wanita: {
        type: Sequelize.STRING
      },
      Nama_Panggilan_wanita: {
        type: Sequelize.STRING
      },
      Ibu_wanita: {
        type: Sequelize.STRING
      },
      Bapak_wanita: {
        type: Sequelize.STRING
      },
      Tanggal_Akad: {
        type: Sequelize.DATE
      },
      Alamat_akad: {
        type: Sequelize.STRING
      },
      Tanggal_Resepsi: {
        type: Sequelize.DATE
      },
      Alamat_resepsi: {
        type: Sequelize.STRING
      },
      Awal_Bertemu: {
        type: Sequelize.TEXT
      },
      Saling_jatuh_cinta: {
        type: Sequelize.TEXT
      },
      Memutuskan_untuk_menikah: {
        type: Sequelize.TEXT
      },
      No_Wa: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      No_Rek: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      Code: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pesanans');
  }
};