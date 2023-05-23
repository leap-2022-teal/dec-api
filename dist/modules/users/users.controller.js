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
exports.authenticateUser = exports.userRegistration = exports.updateUsersById = exports.deleteUsersById = exports.getUsersById = exports.getUsers = void 0;
const users_model_1 = require("./users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield users_model_1.users.find({}, null);
        res.json(list);
    });
}
exports.getUsers = getUsers;
function getUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield users_model_1.users.findById({ _id: id });
        res.json(one);
    });
}
exports.getUsersById = getUsersById;
// export async function createNewUsers(req: Request, res: Response) {
//   const newUsers = req.body;
//   console.log(req, "this req");
//   console.log(newUsers, "new user");
//   try {
//     const createdUser = await users.create(newUsers);
//     res.status(200).json(createdUser._id);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create user" });
//   }
// }
function deleteUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield users_model_1.users.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteUsersById = deleteUsersById;
function updateUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield users_model_1.users.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
    });
}
exports.updateUsersById = updateUsersById;
function userRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        const myPlaintextPassword = newUser.password;
        bcrypt_1.default.hash(myPlaintextPassword, 10, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                newUser.password = hash;
                try {
                    yield users_model_1.users.create(newUser);
                    res.sendStatus(newUser._id);
                }
                catch (error) {
                    res.status(400).json({ error });
                }
            });
        });
    });
}
exports.userRegistration = userRegistration;
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const one = yield users_model_1.users.findOne({ email });
        if (!one) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }
        const verified = bcrypt_1.default.compare(password, one.password);
        if (!verified) {
            res.status(401).json({ message: "Нууц үг буруу байна" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: one._id, role: one.role }, `${process.env.SECRET_KEY}`, { expiresIn: 86400 });
        res.status(200).json({ accessToken });
    });
}
exports.authenticateUser = authenticateUser;
