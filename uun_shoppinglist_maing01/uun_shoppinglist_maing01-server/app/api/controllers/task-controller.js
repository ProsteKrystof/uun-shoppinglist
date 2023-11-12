"use strict";
const TaskAbl = require("../../abl/task-abl.js");

class TaskController {
    create(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return TaskAbl.create(awid, dtoIn);
    }

    delete(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return TaskAbl.delete(awid, dtoIn);
    }

    finish(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return TaskAbl.finish(awid, dtoIn);
    }

    get(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return TaskAbl.get(awid, dtoIn);
    }

    list(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return TaskAbl.list(awid, dtoIn);
    }
}

module.exports = new TaskController();