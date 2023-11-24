"use strict";
const TaskAbl = require("../../abl/task-abl.js");

class TaskController {
    create(ucEnv) {
        return TaskAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    delete(ucEnv) {
        return TaskAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    finish(ucEnv) {
        return TaskAbl.finish(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    get(ucEnv) {
        return TaskAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    list(ucEnv) {
        return TaskAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }
}

module.exports = new TaskController();