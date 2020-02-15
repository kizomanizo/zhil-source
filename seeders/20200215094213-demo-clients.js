'use strict';
const faker = require('faker');
module.exports = {
    up: (queryInterface, Sequelize) => {
        let records = [];
        const record_limit = 20;
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
                    ward: getWards(),
                    hamlet: getHamlet(),
                    village: getStreet(),
                    phone_number: getRandomPhoneNumber(),
                    place_of_birth: getBirthPlace(),
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
        'Juma',
        'Pascal',
        'Khamis',
        'John',
        'Andrew',
        'Bakari',
        'Alphonce',
        'Andrea',
        'Christina',
        'Mariam',
        'Ashura',
        'Michael',
        'Merry',
        'Justina',
        'Yasinta',
        'Lucy',
        'Amani',
        'Telesphory',
        'Ambrose',
        'Kuruthumu',
    ];
    return firstNames[getRandomIndex(firstNames.length)];
}

function getClientMiddlename() {
    const middleNames = [
        'Juma',
        'James',
        'Ramadhan',
        'Khamis',
        'Hamidu',
        'Kenneth',
        'Godwin',
        'Cosmas',
        'Hudini',
        'James',
        'Aloyce',
        'Alphonce',
        'Kulwa',
        'Christine',
        'Adolf',
        'Hussein',
        'Mustafa',
        'Khabib',
        'Kennedy',
        'Sloan',
    ];
    return  middleNames[getRandomIndex(middleNames.length)];
}

function getClientLastname() {
    const lastNames = [
        'Majubwa',
        'Nguruko',
        'Hamdani',
        'Kyemba',
        'Mushi',
        'Lema',
        'Mungiki',
        'Mujuni',
        'Kakoito',
        'Ngina',
        'Gondwe',
        'Sindika',
        'Singano',
        'Mrema',
        'Chitalika',
        'Masubo',
        'Kizobi',
        'Mzobora',
        'Makunde',
        'Magingo',
        'Ally',
        'Suleyman',
        'Mushi',
        'Khalifa',
        'Makame',
    ];
    return lastNames[getRandomIndex(lastNames.length)];
}

function getBirthPlace() {
    const regions = [
        'Arusha',
        'Dar es Salaam',
        'Dodoma',
        'Geita',
        'Iringa',
        'Kagera',
        'Katavi',
        'Kilimanjaro',
        'Kigoma',
        'Lindi',
        'Manyara',
        'Mara',
        'Mbeya',
        'Morogoro',
        'Mtwara',
        'Mwanza',
        'Njombe',
        'Pemba',
        'Pwani',
        'Rukwa',
        'Ruvuma',
        'Shinyanga',
        'Simiyu',
        'Singida',
        'Tabora',
        'Tanga',
        'Unguja',
    ];
    return regions[getRandomIndex(regions.length)];
}

function getWards() {
    const wards = [
        'Dunda',
        'Magomeni',
        'Changanyikeni',
        'Mchikichini',
        'Kaliua',
        'Mazinde',
        'Nianjema',
        'Mikese',
        'Sombetini',
        'Machiwa',
        'Singidani',
        'Malawi',
        'Ngonga',
        'Mwenge',
        'Sinza',
        'Manrangu Mashariki',
        'Burega',
        'Bangwe',
    ];

    return wards[getRandomIndex(wards.length)];
}

function getStreet() {
    const streets = [
        'Mkwajuni',
        'Magomeni',
        'Kibada',
        'Majani mapana',
        'Majengo',
        'Mabatini',
        'Miembeni',
        'Kiembeni',
        'Bagamoyo',
        'Jimboni',
        'Kalani',
        'Makalani',
        'Mferejini',
        'Mikoroshini',
        'Mikindani',
        'Mikindani',
        'Usa liver',
        'Ngarenaro',
        'Ngaramtoni',
        'Unga limited'
    ];
    return streets[getRandomIndex(streets.length)];
}

function getHamlet() {
    const hamlets = ['Masiwa',
        'Masaini',
        'Msasani',
        'BOB',
        'Zinga',
        'Kaliua',
        'Mikindani',
        'Mzizima',
        'Yombo',
        'Sitimbi',
        'Machini', 'Mikocheni', 'Mgambani', 'Madale', 'Vijibweni', 'Kifulu', 'Bonyokwa'
    ];
    return hamlets[getRandomIndex(hamlets.length)];
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