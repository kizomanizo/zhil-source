'use strict';
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        firstname: DataTypes.STRING,
        middlename: DataTypes.STRING,
        lastname: DataTypes.STRING,
        unified_lifetime_number: DataTypes.STRING,
        national_id: DataTypes.STRING,
        voter_id: DataTypes.STRING,
        driver_license_id: DataTypes.STRING,
        nhif_id: DataTypes.STRING,
        ichf_id: DataTypes.STRING,
        birth_certificate_entry_number: DataTypes.STRING,
        ctc_id: DataTypes.STRING,
        tb_id: DataTypes.STRING,
        sex: DataTypes.STRING,
        date_of_birth: DataTypes.STRING,
        region: DataTypes.STRING,
        council: DataTypes.STRING,
        ward: DataTypes.STRING,
        village: DataTypes.STRING,
        hamlet: DataTypes.STRING,
        place_of_birth: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        family_linkages: DataTypes.STRING,
        other_linkages: DataTypes.STRING,
        place_encountered: DataTypes.STRING,
        status: DataTypes.INTEGER,
    }, {});
    Client.associate = function(models) {
        // associations can be defined here
    };
    return Client;
};