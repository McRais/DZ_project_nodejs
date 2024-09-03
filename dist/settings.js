"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const testing_route_1 = require("./routes/testing-route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/blogs', blogs_route_1.blogsRoute);
exports.app.use('/posts', posts_route_1.postsRoute);
exports.app.use('/testing/all-data', testing_route_1.testingRoute);
