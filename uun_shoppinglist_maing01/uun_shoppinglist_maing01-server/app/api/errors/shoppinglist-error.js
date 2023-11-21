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

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Archive.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    ShoppinglistIsAlreadyArchived: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Archive.UC_CODE}shoppinglistIsAlreadyArchived`;
            this.message = "Shoppinglist is already archived.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Archive.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized.";
        }
    }
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

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized.";
        }
    },

    ShoppinglistIsNotArchived: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}shoppinglistIsNotArchived`;
            this.message = "Shoppinglist is not archived.";
        }
    }
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

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Update.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Update.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized.";
        }
    },

    ShoppinglistIsArchived: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Update.UC_CODE}shoppinglistIsArchived`;
            this.message = "Shoppinglist is archived.";
        }
    }
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

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized.";
        }
    }
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

    ShoppinglistDoesNotExist: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${SetMembers.UC_CODE}shoppinglistDoesNotExist`;
            this.message = "Shoppinglist does not exist.";
        }
    },

    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${SetMembers.UC_CODE}userNotAuthorized`;
            this.message = "User is not authorized.";
        }
    },

    ShoppinglistIsArchived: class extends ShoppinglistMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${SetMembers.UC_CODE}shoppinglistIsArchived`;
            this.message = "Shoppinglist is archived.";
        }
    }
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