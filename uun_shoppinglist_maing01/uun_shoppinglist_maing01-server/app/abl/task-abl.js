"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/task-error.js");
const Warnings = require("../api/warnings/task-warning.js");

class TaskAbl {
    constructor() {
        this.validator = Validator.load();
    }

    create(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("taskCreateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        )

        // prepare and return dToOut
        const dToOut = { ...dtoIn };
        dToOut.awid = awid;
        dToOut.uuAppErrorMap = uuAppErrorMap;

        return dToOut;
    }

    delete(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("taskDeleteDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        )

        // prepare and return dToOut
        const dToOut = { ...dtoIn };
        dToOut.awid = awid;
        dToOut.uuAppErrorMap = uuAppErrorMap;

        return dToOut;
    }

    finish(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("taskFinishDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        )

        // prepare and return dToOut
        const dToOut = { ...dtoIn };
        dToOut.awid = awid;
        dToOut.uuAppErrorMap = uuAppErrorMap;

        return dToOut;
    }

    get(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("taskGetDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        )

        // prepare and return dToOut
        const dToOut = { ...dtoIn };
        dToOut.awid = awid;
        dToOut.uuAppErrorMap = uuAppErrorMap;

        return dToOut;
    }

    list(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("taskListDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        )

        // prepare and return dToOut
        const dToOut = { ...dtoIn };
        dToOut.awid = awid;
        dToOut.uuAppErrorMap = uuAppErrorMap;

        return dToOut;
    }
}

module.exports = new TaskAbl();