"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/task-error.js");
const Warnings = require("../api/warnings/task-warning.js");

class TaskAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao("task");
        this.shoppinglistDao = DaoFactory.getDao("shoppinglist");
    }

    async create(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();
        const uuIdentityName = session.getIdentity().getName();

        // check if shoppinglist exists
        const shoppinglist = await this.shoppinglistDao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.Create.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner or member of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Create.UserNotAuthorized({ uuAppErrorMap }, { uuIdentity });
        }

        // create task
        const uuObject = {
            ...dtoIn,
            awid,
            addedBy: uuIdentityName,
            finished: false
        }
        const task = await this.dao.create(uuObject);

        // prepare and return dToOut
        const dToOut = { ...task, uuAppErrorMap};
        return dToOut;
    }

    async delete(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if task exists
        const task = await this.dao.get(awid, dtoIn.taskId);
        if (!task) {
            throw new Errors.Delete.TaskDoesNotExist({ uuAppErrorMap }, { id: dtoIn.taskId });
        }

        // check if user is owner or member of shoppinglist
        const shoppinglist = await this.shoppinglistDao.get(awid, task.listId);
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap }, { uuIdentity });
        }

        // delete task
        const deletedTask = await this.dao.delete(awid, dtoIn.taskId);

        // prepare and return dToOut
        const dToOut = { ...deletedTask, uuAppErrorMap };
        return dToOut;
    }

    async finish(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if task exists
        const task = await this.dao.get(awid, dtoIn.taskId);
        if (!task) {
            throw new Errors.Finish.TaskDoesNotExist({ uuAppErrorMap }, { id: dtoIn.taskId });
        }

        // check if user is owner or member of shoppinglist
        const shoppinglist = await this.shoppinglistDao.get(awid, task.listId);
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Finish.UserNotAuthorized({ uuAppErrorMap }, { uuIdentity });
        }

        // finish task
        const finishedTask = await this.dao.update({ ...task, finished: true });

        // prepare and return dToOut
        const dToOut = { ...finishedTask, uuAppErrorMap };
        return dToOut;
    }

    async get(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if task exists
        const task = await this.dao.get(awid, dtoIn.taskId);
        if (!task) {
            throw new Errors.Get.TaskDoesNotExist({ uuAppErrorMap }, { id: dtoIn.taskId });
        }

        // check if user is owner or member of shoppinglist
        const shoppinglist = await this.shoppinglistDao.get(awid, task.listId);
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.Get.UserNotAuthorized({ uuAppErrorMap }, { uuIdentity });
        }

        // prepare and return dToOut
        const dToOut = { ...task, uuAppErrorMap };
        return dToOut;
    }

    async list(awid, dtoIn, session) {
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

        // get uuIdentity information from session
        const uuIdentity = session.getIdentity().getUuIdentity();

        // check if shoppinglist exists
        const shoppinglist = await this.shoppinglistDao.get(awid, dtoIn.listId);
        if (!shoppinglist) {
            throw new Errors.List.ShoppinglistDoesNotExist({ uuAppErrorMap }, { listId: dtoIn.listId });
        }

        // check if user is owner or member of shoppinglist
        if (shoppinglist.uuIdentity !== uuIdentity && shoppinglist.members.filter(member => member.identity === uuIdentity).length === 0) {
            throw new Errors.List.UserNotAuthorized({ uuAppErrorMap }, { uuIdentity });
        }

        // list tasks
        const tasks = await this.dao.listByListId(awid, dtoIn.listId, dtoIn.pageInfo);

        // prepare and return dToOut
        const dToOut = { tasks, uuAppErrorMap };
        return dToOut;
    }
}

module.exports = new TaskAbl();