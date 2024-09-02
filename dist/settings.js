"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const DB_1 = require("./database/DB");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//for testing
exports.app.delete('/testing/all-data', (req, res) => {
    DB_1.blogsDB.length = 0;
    DB_1.postsDB.length = 0;
    res.sendStatus(204);
});
exports.app.use('/blogs', blogs_route_1.blogsRoute);
exports.app.use('/posts', posts_route_1.postsRoute);
