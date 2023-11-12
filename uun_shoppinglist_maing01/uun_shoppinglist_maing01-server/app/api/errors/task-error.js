"use strict";
const ShoppingListMainUseCaseError = require("./shoppinglist-main-use-case-error");

const Create = {
    UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}task/create/`,

    InvalidDtoIn: class extends ShoppingListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Delete = {
    UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}task/delete/`,

    InvalidDtoIn: class extends ShoppingListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Finish = {
    UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}task/finish/`,

    InvalidDtoIn: class extends ShoppingListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Finish.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const Get = {
    UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}task/get/`,

    InvalidDtoIn: class extends ShoppingListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

const List = {
    UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}task/list/`,

    InvalidDtoIn: class extends ShoppingListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
};

module.exports = {
    Create, Delete, Finish, Get, List
}