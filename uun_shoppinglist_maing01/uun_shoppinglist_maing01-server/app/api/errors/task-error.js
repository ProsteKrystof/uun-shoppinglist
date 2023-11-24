"use strict";
const ShoppinglistMainUseCaseError = require("./shoppinglist-main-use-case-error");

const Create = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}task/create/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized to create task.";
        }
    }
};

const Delete = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}task/delete/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },

    TaskDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}taskDoesNotExist`;
            this.message = "Task does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized to delete task.";
        }
    }
};

const Finish = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}task/finish/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Finish.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },

    TaskDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Finish.UC_CODE}taskDoesNotExist`;
            this.message = "Task does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Finish.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized to finish task.";
        }
    }
};

const Get = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}task/get/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },

    TaskDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}taskDoesNotExist`;
            this.message = "Task does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized to get task.";
        }
    }
};

const List = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}task/list/`,

    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized to list tasks.";
        }
    }
};

module.exports = {
    Create,
    Delete,
    Finish,
    Get,
    List
}