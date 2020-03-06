'use strict';
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        uuid: DataTypes.STRING,
        firstname: DataTypes.STRING,
        middlename: DataTypes.STRING,
        lastname: DataTypes.STRING,
        othername: DataTypes.STRING,
        uln: DataTypes.STRING,
        national_id: DataTypes.STRING,
        voter_id: DataTypes.STRING,
        dl_id: DataTypes.STRING,
        nhif_id: DataTypes.STRING,
        ichf_id: DataTypes.STRING,
        rita_id: DataTypes.STRING,
        ctc_id: DataTypes.STRING,
        tb_id: DataTypes.STRING,
        sex: DataTypes.STRING,
        dob: DataTypes.STRING,
        region: DataTypes.STRING,
        council: DataTypes.STRING,
        ward: DataTypes.STRING,
        village: DataTypes.STRING,
        hamlet: DataTypes.STRING,
        place_of_birth: DataTypes.STRING,
        phone_prefix: DataTypes.STRING,
        phone_suffix: DataTypes.STRING,
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