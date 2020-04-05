'use strict';
const faker = require('faker');
module.exports = {
    up: (queryInterface, Sequelize) => {
        let records = [];
        const record_limit = 50;
        let record_counter = 0;
        while (record_counter < record_limit) {
            records = [
                ...records, {
                    uuid: getUuid(),
                    firstname: getClientFirstname(),
                    middlename: getClientMiddlename(),
                    lastname: getClientLastname(),
                    othername: getClientOthername(),
                    uln: getOtherIds(), 
                    national_id: getNidaIds(),
                    voter_id: getVoterIds(),
                    dl_id: getDlNumber(),
                    nhif_id: generateXDigitsNumber(12),
                    ichf_id: getOtherIds(),
                    rita_id: getOtherIds(),
                    ctc_id: generateXDigitsNumber(10),
                    tb_id: generateXDigitsNumber(10),
                    sex: record_counter % 2 === 0 ? "MALE" : "FEMALE",
                    dob: faker.date.past(),
                    region: getRegions(),
                    council: getCouncils(),
                    ward: getWards(),
                    village: getVillages(),
                    hamlet: getHamlets(),
                    place_of_birth: getBirthRegions(),
                    phone_prefix: getRandomPhonePrefix(),
                    phone_suffix: getRandomPhoneSuffix(),
                    family_linkages: getClientFirstname() + " " + getClientLastname(),
                    other_linkages: faker.name.title(),
                    place_encountered: faker.address.streetSuffix(),
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

function getUuid() {
    return faker.random.uuid() !== 'undefined' ? faker.random.uuid() : getUuid()
}

function getNidaIds() {
    return generateXDigitsNumber(8) + "-" + generateXDigitsNumber(5) + "-" + generateXDigitsNumber(5) + "-" + generateXDigitsNumber(2)
}
function getVoterIds() {
    return "T-" + generateXDigitsNumber(4) + "-" + generateXDigitsNumber(4) + "-" + generateXDigitsNumber(3) + "-" + generateXDigitsNumber(1)
}

function getOtherIds() {
    return generateXDigitsNumber(6) + "-" + generateXDigitsNumber(4)
}

function getDlNumber() {
    return 400 + generateXDigitsNumber(7)
}

function getClientFirstname() {
    const firstNames = [
        'Amina', 'Lucy', 'Susan', 'Tausi', 'Neema', 'Mussa', 'Baraka', 'John', 'Vivian',
        'Joseph', 'Peter', 'Mohamed', 'Abdul', 'Isack', 'Celestine', 'Cosmas',
        'Ayubu', 'Paul', 'Winnie', 'Dativa', 'Zaynab', 'Grace', 'Erick', 'Jafari',
    ];
    return firstNames[getRandomIndex(firstNames.length -1)];
}

function getClientMiddlename() {
    const middleNames = [
        'Mawazo', 'Juma', 'Ali', 'John', 'Joseph', 'Sauli', 'Amon',
        'Ahmed', 'Abdallah', 'Patrick', 'Sosthenes', 'Marko', 'Peter',
        'Baraka', 'Musa', 'Kheri', 'Mfugale',
    ];
    return  middleNames[getRandomIndex(middleNames.length -1)];
}

function getClientLastname() {
    const lastNames = [
        'Chale', 'Ally', 'Iddi', 'Maangwatay', 'Mabusi', 'Bagumhe', 'Tlatla', 'Quang', 'Boya',
        'Juma', 'Alfayo', 'Slaa', 'Tluway', 'Boay', 'Slegeray', 'Kulle', 'Maleyeck',
        'Fisoo', 'Sulle', 'Burra', 'Baha', 'Matle', 'Kizito',
    ];
    return lastNames[getRandomIndex(lastNames.length -1)];
}

function getClientOthername() {
    const otherNames = [
        'Papaa', 'Faru', 'Chalii', 'Oyaoya', 'Amsha', 'Mishe', 'Bumunda', 'Maprosoo', 'Kisu', 'Mangi', 'Chief',
        'Samatta', 'Drogba', 'Mkali', 'Ticha', 'Bob', 'Ras', 'Dogo', 'Kadogoo',
        'Fundi', 'P-Funk', 'Majani', 'Kijiti', 'Mafegi', 'Janjaro',
    ];
    return otherNames[getRandomIndex(otherNames.length -1)];
}

function getBirthRegions() {
    const regions = [
        'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kilimanjaro', 'Kigoma', 'Lindi',
        'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Njombe', 'Pemba', 'Pwani', 'Rukwa', 'Ruvuma',
        'Shinyanga', 'Simiyu', 'Singida', 'Tabora', 'Tanga', 'Unguja',
    ];
    return regions[getRandomIndex(regions.length -1)];
}

function getRegions() {
    const regions = [
        'Arusha',
        'Manyara',
    ];
    return regions[getRandomIndex(regions.length -1)];
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
    return councils[getRandomIndex(councils.length -1)];
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

    return wards[getRandomIndex(wards.length -1)];
}

function getHamlets() {
    const hamlets = ['Masiwa',
        'Endachini', 'Maqatay', 'Sokoni', 'Mjini Kati', 'Toroka Uje', 'Nyamahoma',
        'Maweni', 'Tutani', 'Mpepo', 'Mvumo', 'Kivulini', 'Tulivu',
    ];
    return hamlets[getRandomIndex(hamlets.length -1)];
}

function getVillages() {
    const villages = [
        'Endagichang', 'Dabil', 'Taptap', 'Ubwegeni', 'Mwenge', 'Mapambano', 'Mlinganyo', 'Gidabudash', 'Qorro', 'Aqweso', 'Qoroda',
        'Qameyu', 'Qorro', 'Tutlat', 'Barabarani', 'Mwisho', 'Mpungani', 'Pilau', 'Chuini', 'Robayambao', 'Mtambowagongo',
    ]
    return villages[getRandomIndex(villages.length -1)];
}

function getRandomPhonePrefix() {
    const prefixes = [
        '0654',
        '0754',
        '0785',
        '0655',
        '0775',
        '0653',
        '0755',
    ];
    return prefixes[getRandomIndex(prefixes.length -1)] !== 'undefined' ? prefixes[getRandomIndex(prefixes.length -1)]
    : 
    getRandomPhonePrefix();
}

function getRandomPhoneSuffix() {
    return generateXDigitsNumber(6) !== 'undefined' ? generateXDigitsNumber(6) : getRandomPhoneSuffix()
}

function getRandomIndex(maximunLimit) {
    return Math.round(Math.random() * maximunLimit)
}


function generateXDigitsNumber(digits) {
    let add = 1, max = 12 - add;
    if (digits > max) {
        return generateXDigitsNumber(max) + generateXDigitsNumber(digits - max);
    }
    max = Math.pow(10, digits + add);
    let min = max / 10; // Math.pow(10, n) basically
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
}