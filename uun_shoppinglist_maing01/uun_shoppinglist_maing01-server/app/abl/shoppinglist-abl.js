"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const AppClient = require("uu_appg01_server").AppClient;
const { UriBuilder } = require("uu_appg01_server").Uri;

const Errors = require("../api/errors/shoppinglist-error.js");
const Warnings = require("../api/warnings/shoppinglist-warning.js");

class ShoppinglistAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao("shoppinglist");
        this.taskDao = DaoFactory.getDao("task");
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

        // use AppClient to get personName from uuIdentity
        const uuIdmBaseUri = "https://uuapp-dev.plus4u.net/uu-identitymanagement-maing01/58ceb15c275c4b31bfe0fc9768aa6a9c";
        const uuIdmPersonIdentityLoadUri = UriBuilder.parse(uuIdmBaseUri).setUseCase("uuPersonIdentity/load");

        let members = [];
        for (let member of dtoIn.memberIdentities) {
            const personIdentityLoadDtoIn = {
                uuIdentity: member,
            };

            let personName = "Unknown";
            try {
                let personIdentityLoadDtoOut = await AppClient.cmdGet(uuIdmPersonIdentityLoadUri, personIdentityLoadDtoIn, { session });
                personName = personIdentityLoadDtoOut.name + " " + personIdentityLoadDtoOut.surname;
            } catch (e) {
                console.log(e);
            };

            members.push({ identity: member, name: personName });
        }

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();
        const uuIdentityName = session.getIdentity().getName();

        // save shoppinglist to uuObjectStore
        const uuObject = {
            name: dtoIn.name,
            color: dtoIn.color,
            members,
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
        const shoppinglist = await this.dao.get(awid, dtoIn.id);
        if (!shoppinglist) {
            throw new Errors.Archive.ShoppinglistDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if shoppinglist is already archived
        if (shoppinglist.archived) {
            throw new Errors.Archive.ShoppinglistIsAlreadyArchived({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.Archive.UserNotAuthorized({ uuAppErrorMap }, { id: dtoIn.id });
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
        const shoppinglist = await this.dao.get(awid, dtoIn.id);
        if (!shoppinglist) {
            throw new Errors.Delete.ShoppinglistDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if shoppinglist is archived
        if (!shoppinglist.archived) {
            throw new Errors.Delete.ShoppinglistIsNotArchived({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // delete all tasks of shoppinglist
        const tasks = await this.taskDao.listByListId(awid, shoppinglist.id.toString(), { pageIndex: 0, pageSize: 1000 });
        for (let task of tasks.itemList) {
            await this.taskDao.delete(awid, task.id);
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
        const shoppinglist = await this.dao.get(awid, dtoIn.id);
        if (!shoppinglist) {
            throw new Errors.Update.ShoppinglistDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if shoppinglist is archived
        if (shoppinglist.archived) {
            throw new Errors.Update.ShoppinglistIsArchived({ uuAppErrorMap }, { id: dtoIn.id });
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
        const shoppinglist = await this.dao.get(awid, dtoIn.id);
        if (!shoppinglist) {
            throw new Errors.Get.ShoppinglistDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if user is owner or member of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Get.UserNotAuthorized({ uuAppErrorMap }, { id: dtoIn.id });
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
        const shoppinglists = await this.dao.listByUuIdentity(awid, uuIdentity, dtoIn.pageInfo);

        // add taskAmount and finishedTaskAmount to shoppinglists
        for (let shoppinglist of shoppinglists.itemList) {
            const tasks = await this.taskDao.listByListId(awid, shoppinglist.id.toString(), { pageIndex: 0, pageSize: 1000 });
            shoppinglist.taskAmount = tasks.itemList.length;
            shoppinglist.finishedTaskAmount = tasks.itemList.filter(task => task.finished).length;
        }

        // prepare and return dToOut
        const dToOut = { ...shoppinglists, uuAppErrorMap };
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
        const shoppinglist = await this.dao.get(awid, dtoIn.id);
        if (!shoppinglist) {
            throw new Errors.SetMembers.ShoppinglistDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if user is owner of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity) {
            throw new Errors.SetMembers.UserNotAuthorized({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if shoppinglist is archived
        if (shoppinglist.archived) {
            throw new Errors.SetMembers.ShoppinglistIsArchived({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // use AppClient to get personName from uuIdentity
        const uuIdmBaseUri = "https://uuapp-dev.plus4u.net/uu-identitymanagement-maing01/58ceb15c275c4b31bfe0fc9768aa6a9c";
        const uuIdmPersonIdentityLoadUri = UriBuilder.parse(uuIdmBaseUri).setUseCase("uuPersonIdentity/load");

        let members = [];
        for (let member of dtoIn.memberIdentities) {
            const personIdentityLoadDtoIn = {
                uuIdentity: member,
            };

            let personName = "Unknown";
            try {
                let personIdentityLoadDtoOut = await AppClient.cmdGet(uuIdmPersonIdentityLoadUri, personIdentityLoadDtoIn, { session });
                personName = personIdentityLoadDtoOut.name + " " + personIdentityLoadDtoOut.surname;
            } catch (e) {
                console.log(e);
            };

            members.push({ identity: member, name: personName });
        }

        // set members
        shoppinglist.members = members;
        const updatedList = await this.dao.update(shoppinglist);

        // prepare and return dToOut
        const dToOut = { ...updatedList, uuAppErrorMap };
        return dToOut;
    }

    async leave(awid, dtoIn, session) {
        let uuAppErrorMap = {};

        // validation of dToIn
        const validationResult = this.validator.validate("shoppinglistLeaveDtoInType", dtoIn);
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
        const shoppinglist = await this.dao.get(awid, dtoIn.id);
        if (!shoppinglist) {
            throw new Errors.Leave.ShoppinglistDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // check if user is member of shoppinglist
        if (shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Leave.UserNotAuthorized({ uuAppErrorMap }, { id: dtoIn.id });
        }

        // leave shoppinglist
        shoppinglist.members = shoppinglist.members.filter(member => member.identity !== uuIdentity);
        await this.dao.update(shoppinglist);

        // prepare and return dToOut
        const dToOut = { uuAppErrorMap };
        return dToOut;
    }
}

module.exports = new ShoppinglistAbl();