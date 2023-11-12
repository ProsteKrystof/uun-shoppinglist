"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/shoppinglist-error.js");
const Warnings = require("../api/warnings/shoppinglist-warning.js");

class ShoppinglistAbl {
    constructor() {
        this.validator = Validator.load();
    }

    create(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("shoppinglistCreateDtoInType", dtoIn);
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

    archive(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("shoppinglistArchiveDtoInType", dtoIn);
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
        const validationResult = this.validator.validate("shoppinglistDeleteDtoInType", dtoIn);
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

    update(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("shoppinglistUpdateDtoInType", dtoIn);
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
        const validationResult = this.validator.validate("shoppinglistGetDtoInType", dtoIn);
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
        const validationResult = this.validator.validate("shoppinglistListDtoInType", dtoIn);
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

    setMembers(awid, dtoIn) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("shoppinglistSetMembersDtoInType", dtoIn);
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

module.exports = new ShoppinglistAbl();