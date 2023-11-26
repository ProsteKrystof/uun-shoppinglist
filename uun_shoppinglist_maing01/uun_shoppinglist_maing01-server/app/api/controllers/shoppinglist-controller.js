"use strict";
const ShoppinglistAbl = require("../../abl/shoppinglist-abl.js");

class ShoppinglistController {
    create(ucEnv) {
        return ShoppinglistAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    archive(ucEnv) {
        return ShoppinglistAbl.archive(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    delete(ucEnv) {
        return ShoppinglistAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    update(ucEnv) {
        return ShoppinglistAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    get(ucEnv) {
        return ShoppinglistAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    list(ucEnv) {
        return ShoppinglistAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    setMembers(ucEnv) {
        return ShoppinglistAbl.setMembers(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }

    leave(ucEnv) {
        return ShoppinglistAbl.leave(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
    }
}

module.exports = new ShoppinglistController();