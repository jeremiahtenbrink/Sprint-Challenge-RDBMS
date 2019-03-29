"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = (status, message) => {
    return {
        status,
        message
    };
};
exports.sendError = (error, res) => {
    res.status(error.status || 500).json({
        status: error.status || 500, message: error.message || "Server error"
    });
};
//# sourceMappingURL=error.js.map