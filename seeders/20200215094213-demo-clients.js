'use strict';
const faker = require('faker');
module.exports = {
    up: (queryInterface, Sequelize) => {
        let records = [];
        const record_limit = 123;
        let record_counter = 0;
        while (record_counter < record_limit) {
            records = [
                ...records, {
                    firstname: getClientFirstname(),
                    middlename: getClientMiddlename(),
                    lastname: getClientLastname(),
                    unified_lifetime_number: getGovermentIds(),
                    national_id: getGovermentIds(),
                    voter_id: getGovermentIds(),
                    driver_license_id: faker.random.alphaNumeric(10),
                    nhif_id: getGovermentIds(),
                    ichf_id: getGovermentIds(),
                    birth_certificate_entry_number: getGovermentIds(),
                    ctc_id: generateNthDitigNumber(10),
                    tb_id: generateNthDitigNumber(10),
                    sex: record_counter % 2 === 0 ? "MALE" : "FEMALE",
                    date_of_birth: faker.date.past(),
                    region: getRegions(),
                    council: getCouncils(),
                    ward: getWards(),
                    village: getVillages(),
                    hamlet: getHamlets(),
                    place_of_birth: getBirthRegions(),
                    phone_number: getRandomPhoneNumber(),
                    family_linkages: faker.name.title(),
                    other_linkages: faker.name.title(),
                    place_encountered: faker.company.companyName(),
                    createdAt: faker.date.recent(),
                    updatedAt: faker.date.future()
                }
            ];
            record_counter++;
        }
        return queryInterface.bulkInsert('Clients', records);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Clients', null, {});
    }
};

function getGovermentIds() {
    return "T-" + generateNthDitigNumber(4) + "-" + generateNthDitigNumber(4) + "-" + generateNthDitigNumber(3) + "-" + generateNthDitigNumber(1)
}

function getClientFirstname() {
    const firstNames = [
        'Amina', 'Lucy', 'Susan', 'Tausi', 'Neema', 'Mussa', 'Baraka', 'John', 'Vivian',
        'Joseph', 'Peter', 'Mohamed', 'Abdul', 'Isack', 'Celestine', 'Cosmas',
        'Ayubu', 'Paul', 'Winnie', 'Dativa', 'Zaynab', 'Grace', 'Erick', 'Jafari',
    ];
    return firstNames[getRandomIndex(firstNames.length)];
}

function getClientMiddlename() {
    const middleNames = [
        'Mawazo', 'Juma', 'Ali', 'John', 'Joseph', 'Sauli', 'Amon',
        'Ahmed', 'Abdallah', 'Patrick', 'Sosthenes', 'Marko', 'Peter',
        'Baraka', 'Neema', 'Kheri', 'Mfugale', 'Rashid',
    ];
    return  middleNames[getRandomIndex(middleNames.length)];
}

function getClientLastname() {
    const lastNames = [
        'Chale', 'Ally', 'Iddi', 'Mangushi', 'Mabusi', 'Bagumhe', 'Mushi', 'Chizi', 'Juha',
        'Juma', 'Alfayo', 'Slaa', 'Tluway', 'Boay', 'Slegeray', 'Kulle', 'Maleyeck',
        'Fisoo', 'Sulle', 'Burra', 'Baha', 'Matle', 'Kizito',
    ];
    return lastNames[getRandomIndex(lastNames.length)];
}

function getBirthRegions() {
    const regions = [
        'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kilimanjaro', 'Kigoma', 'Lindi',
        'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Njombe', 'Pemba', 'Pwani', 'Rukwa', 'Ruvuma',
        'Shinyanga', 'Simiyu', 'Singida', 'Tabora', 'Tanga', 'Unguja',
    ];
    return regions[getRandomIndex(regions.length)];
}

function getRegions() {
    const regions = [
        'Arusha',
        'Manyara',
    ];
    return regions[getRandomIndex(regions.length)];
}

function getCouncils() {
    const councils = [
        'Babati DC',
        'Babati TC',
        'Hanang',
        'Simanjiro',
        'Kiteto',
        'Mbulu',
    ];
    return councils[getRandomIndex(councils.length)];
}

function getWards() {
    const wards = [
        'Arri', 'Ayasanda', 'Bashnet', 'Galapo', 'Magugu', 'Qash', 'Riroda', 'Ufana',
        'Bagara', 'Bonga', 'Sigino', 'Singe', 'Tumati', 'Yaeda Ampa', 'Yaeda Chini',
        'Balangdalalu', 'Basodesh', 'Ganana', 'Gehandu', 'Giting', 'Lalaji', 'Masakta', 'Mogitu', 'Nangwa',
        'Bwagamoyo', 'Dongo', 'Dosidosi', 'Kibaya', 'Matui', 'Magungu', 'Namelock', 'Laiseri',
        'Ayamaami', 'Daudi', 'Dongobesh', 'Endagikoth', 'Haydom', 'Maghang', 'Maretadu', 'Tlawi',
        'Emboret', 'Endiamtu', 'Komolo', 'Mererani', 'Naberera', 'Orkesumet', 'Terrat',
    ];

    return wards[getRandomIndex(wards.length)];
}

function getHamlets() {
    const hamlets = ['Masiwa',
        'Endachini', 'Maqatay', 'Sokoni', 'Mjini Kati', 'Toroka Uje', 'Nyamahoma',
        'Maweni', 'Tutani', 'Mpepo', 'Mvumo', 'Kivulini', 'Tulivu',
    ];
    return hamlets[getRandomIndex(hamlets.length)];
}

function getVillages() {
    const villages = [
        'Endagichang', 'Dabil', 'Taptap', 'Ubwegeni', 'Mwenge', 'Mapambano', 'Mlinganyo', 'Gidabudash', 'Qorro', 'Aqweso', 'Qoroda',
        'Qameyu', 'Qorro', 'Tutlat', 'Barabarani', 'Mwisho', 'Mpungani', 'Pilau', 'Chuini', 'Robayambao', 'Mtambowagongo',
    ]
    return villages[getRandomIndex(villages.length)];
}

function getRandomPhoneNumber() {
    const prefixes = [
        '0654',
        '0754',
        '0785',
        '0655',
        '0775',
        '0653',
        '0755',
    ];
    return prefixes[getRandomIndex(prefixes.length)] !== 'undefined' ?
        prefixes[getRandomIndex(prefixes.length)] + " " + generateNthDitigNumber(3) + " " + generateNthDitigNumber(3)
        :
        getRandomPhoneNumber();
}

function getRandomIndex(maximunLimit) {
    return Math.round(Math.random() * maximunLimit)
}


function generateNthDitigNumber(digits) {
    let add = 1, max = 12 - add;

    if (digits > max) {
        return generateNthDitigNumber(max) + generateNthDitigNumber(digits - max);
    }
    max = Math.pow(10, digits + add);
    let min = max / 10; // Math.pow(10, n) basically
    let number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}