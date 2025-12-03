"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (value) => {
    if (!isString(value)) {
        throw new Error("Invalid or missing string value");
    }
    return value;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (visibility) => {
    if (!isString(visibility) || !isGender(visibility)) {
        throw new Error('Incorrect visibility: ' + visibility);
    }
    return visibility;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };
        return newPatient;
    }
    console.log(object);
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatient = toNewPatient;
exports.default = exports.toNewPatient;
