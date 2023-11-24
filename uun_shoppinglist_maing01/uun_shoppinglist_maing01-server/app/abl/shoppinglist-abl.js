"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/shoppinglist-error.js");
const Warnings = require("../api/warnings/shoppinglist-warning.js");

class ShoppinglistAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao("shoppinglist");
    }

    async create(awid, dtoIn, session) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("shoppinglistCreateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        );

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();
        const uuIdentityName = session.getIdentity().getName();

        // save shoppinglist to uuObjectStore
        const uuObject = {
            ...dtoIn,
            awid,
            archived: false,
            uuIdentity,
            uuIdentityName
        }
        const shoppinglist = await this.dao.create(uuObject);

        // prepare and return dToOut
        const dToOut = { ...shoppinglist, uuAppErrorMap };
        return dToOut;
    }

    async archive(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if shoppinglist exists
        const shoppinglist = await this.dao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.Archive.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if shoppinglist is already archived
        if (shoppinglist.archived) {
            throw new Errors.Archive.ShoppinglistIsAlreadyArchived({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.Archive.UserNotAuthorized({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // archive shoppinglist
        shoppinglist.archived = true;
        const updatedList = await this.dao.update(shoppinglist);

        // prepare and return dToOut
        const dToOut = { ...updatedList, uuAppErrorMap };
        return dToOut;
    }

    async delete(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if shoppinglist exists
        const shoppinglist = await this.dao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.Delete.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if shoppinglist is archived
        if (!shoppinglist.archived) {
            throw new Errors.Delete.ShoppinglistIsNotArchived({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // delete shoppinglist
        const deletedList = await this.dao.delete(shoppinglist.awid, shoppinglist.id);

        // prepare and return dToOut
        const dToOut = { ...deletedList, uuAppErrorMap };
        return dToOut;
    }

    async update(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if shoppinglist exists
        const shoppinglist = await this.dao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.Update.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if shoppinglist is archived
        if (shoppinglist.archived) {
            throw new Errors.Update.ShoppinglistIsArchived({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // update shoppinglist
        const uuObject = {
            ...shoppinglist,
            name: dtoIn.name,
            color: dtoIn.color
        }
        const updatedList = await this.dao.update(uuObject);

        // prepare and return dToOut
        const dToOut = { ...updatedList, uuAppErrorMap };
        return dToOut;
    }

    async get(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if shoppinglist exists
        const shoppinglist = await this.dao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.Get.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner or member of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Get.UserNotAuthorized({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // prepare and return dToOut
        const dToOut = { ...shoppinglist, uuAppErrorMap };
        return dToOut;
    }

    async list(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // list shoppinglists
        const shoppinglists = await this.dao.list(awid, dtoIn.pageInfo);

        // filter shoppinglists by user
        const filteredShoppinglists = shoppinglists.itemList.filter(
            shoppinglist => shoppinglist.uuIdentity === uuIdentity || shoppinglist.members.filter(member => member.identity === uuIdentity).length > 0
        );

        // prepare and return dToOut
        const dToOut = { filteredShoppinglists, uuAppErrorMap };
        return dToOut;
    }

    async setMembers(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if shoppinglist exists
        const shoppinglist = await this.dao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.SetMembers.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.SetMembers.UserNotAuthorized({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if shoppinglist is archived
        if (shoppinglist.archived) {
            throw new Errors.SetMembers.ShoppinglistIsArchived({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // set members
        shoppinglist.members = dtoIn.members;
        const updatedList = await this.dao.update(shoppinglist);

        // prepare and return dToOut
        const dToOut = { ...updatedList, uuAppErrorMap };
        return dToOut;
    }
}

module.exports = new ShoppinglistAbl();