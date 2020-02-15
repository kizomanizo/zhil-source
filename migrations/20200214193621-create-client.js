'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Clients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                type: Sequelize.STRING,
                defaultValue: "Musa",
            },
            middlename: {
                type: Sequelize.STRING,
                defaultValue: "Amani",
            },
            lastname: {
                type: Sequelize.STRING,
                defaultValue: "Baraka",
            },
            unified_lifetime_number: {
                type: Sequelize.STRING
            },
            national_id: {
                type: Sequelize.STRING
            },
            voter_id: {
                type: Sequelize.STRING
            },
            driver_license_id: {
                type: Sequelize.STRING
            },
            nhif_id: {
                type: Sequelize.STRING
            },
            ichf_id: {
                type: Sequelize.STRING
            },
            birth_certificate_entry_number: {
                type: Sequelize.STRING
            },
            ctc_id: {
                type: Sequelize.STRING
            },
            tb_id: {
                type: Sequelize.STRING
            },
            sex: {
                type: Sequelize.STRING
            },
            date_of_birth: {
                type: Sequelize.STRING
            },
            ward: {
                type: Sequelize.STRING
            },
            village: {
                type: Sequelize.STRING
            },
            hamlet: {
                type: Sequelize.STRING
            },
            phone_number: {
                type: Sequelize.STRING
            },
            place_of_birth: {
                type: Sequelize.STRING
            },
            family_linkages: {
                type: Sequelize.STRING
            },
            other_linkages: {
                type: Sequelize.STRING
            },
            place_encountered: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Clients');
  }
};