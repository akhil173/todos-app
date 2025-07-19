const { success } = require("zod");

module.exports = {
    SUCCESSFUL_DELETE: {
        code: 200,
        message: "Successfully deleted",
        success: true,
    },
    SUCCESSFUL_UPDATE: {
        code: 200,
        message: "Updated successfully",
        success: true,
    },
    SUCCESSFUL_ADDITION: {
        code: 200,
        message: "Added Successfully",
        success: true,
    },
    SUCCESSFUL_RETRIEVAL: {
        code: 200,
        message: "Retrieved Successfully",
        success: true
    },
    GENERIC_ERROR: {
        code: 400,
        error: "Internal Server Error",
        success: false
    },
    ERROR_DATA_NOT_FOUND: {
        code: 404,
        error: "Data not found / Invalid ID",
        success: false
    }
}