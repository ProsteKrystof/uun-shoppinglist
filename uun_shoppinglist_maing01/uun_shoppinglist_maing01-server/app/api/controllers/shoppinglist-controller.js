"use strict";
const ShoppinglistAbl = require("../../abl/shoppinglist-abl.js");

class ShoppinglistController {
    create(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.create(awid, dtoIn);
    }

    archive(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.archive(awid, dtoIn);
    }

    delete(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.delete(awid, dtoIn);
    }

    update(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.update(awid, dtoIn);
    }

    get(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.get(awid, dtoIn);
    }

    list(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.list(awid, dtoIn);
    }

    setMembers(ucEnv) {
        const awid = ucEnv.getUri().getAwid();
        const dtoIn = ucEnv.parameters;
        return ShoppinglistAbl.setMembers(awid, dtoIn);
    }
}

module.exports = new ShoppinglistController();