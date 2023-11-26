const Errors = require("../errors/shoppinglist-error.js");

const Warnings = {
    Create: {
        UnsupportedKeys: {
            code: `${Errors.Create.UC_CODE}unsupportedKeys`,
        },
    },

    Archive: {
        UnsupportedKeys: {
            code: `${Errors.Archive.UC_CODE}unsupportedKeys`,
        },
    },

    Delete: {
        UnsupportedKeys: {
            code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
        },
    },

    Update: {
        UnsupportedKeys: {
            code: `${Errors.Update.UC_CODE}unsupportedKeys`,
        },
    },

    Get: {
        UnsupportedKeys: {
            code: `${Errors.Get.UC_CODE}unsupportedKeys`,
        },
    },

    List: {
        UnsupportedKeys: {
            code: `${Errors.List.UC_CODE}unsupportedKeys`,
        },
    },

    SetMembers: {
        UnsupportedKeys: {
            code: `${Errors.SetMembers.UC_CODE}unsupportedKeys`,
        },
    },

    Leave: {
        UnsupportedKeys: {
            code: `${Errors.Leave.UC_CODE}unsupportedKeys`,
        },
    }
}

module.exports = Warnings;