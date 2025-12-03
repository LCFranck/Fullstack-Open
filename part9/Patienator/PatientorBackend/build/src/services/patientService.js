"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const crypto_1 = require("crypto");
const patients = patients_1.default;
const getPatients = () => { return patients; };
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findById = (id) => {
    const patient = patients.find(d => d.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newId = (0, crypto_1.randomUUID)();
    const newPatient = Object.assign({ id: newId }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
    findById
};
