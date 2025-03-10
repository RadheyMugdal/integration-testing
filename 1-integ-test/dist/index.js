"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.post("/sum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { a, b } = req.body;
    if (a > 100000 || b > 100000) {
        res.status(400).json({ message: "Sorry we dont support big numbers" });
        return;
    }
    const result = a + b;
    const response = yield db_1.default.request.create({
        data: {
            a,
            b,
            answer: result,
            type: "ADD",
        },
    });
    res.json({ answer: result, id: response.id }).status(200);
    return;
}));
exports.app.post("/multiply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { a, b } = req.body;
    if (a > 100000 || b > 100000) {
        res.status(400).json({ message: "Sorry we dont support big numbers" });
        return;
    }
    const result = a * b;
    const response = yield db_1.default.request.create({
        data: {
            a,
            b,
            answer: result,
            type: "MUL",
        },
    });
    res.json({ answer: result, id: response.id }).status(200);
    return;
}));
