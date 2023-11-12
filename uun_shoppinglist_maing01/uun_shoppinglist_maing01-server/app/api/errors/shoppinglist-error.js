"use strict";
const ShoppinglistMainUseCaseError = require("./shoppinglist-main-use-case-error");

const Create = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/create/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Archive = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/archive/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Archive.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Delete = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/delete/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Update = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/update/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Update.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Get = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/get/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const List = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/list/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const SetMembers = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppinglist/setMembers/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${SetMembers.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

module.exports = {
    Create,
    Archive,
    Delete,
    Update,
    Get,
    List,
    SetMembers
};