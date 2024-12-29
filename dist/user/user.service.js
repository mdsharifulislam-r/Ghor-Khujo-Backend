"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entitys/user.entity");
const typeorm_2 = require("typeorm");
const bycrpt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const userUpdateSql_1 = require("../lib/helper/userUpdateSql");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(userRepo, jwtService, mailService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async registerUser(data, res) {
        try {
            const rows = await this.userRepo.query('SELECT * FROM user WHERE email = ?', [data.email]);
            if (rows[0]?.name) {
                return res.status(400).json({
                    statusCode: 400,
                    error: "Bad Request",
                    message: ["Account Already Exists"]
                });
            }
            if (data.password.length < 8) {
                return res.status(400).json({
                    statusCode: 400,
                    error: "Bad Request",
                    message: ["Password in less then 8 charachter"]
                });
            }
            const hashPass = await bycrpt.hash(data.password, 10);
            await this.userRepo.query('INSERT INTO `user`(`name`, `password`, `email`, `image`, `address`, `phone`) VALUES (?,?,?,?,?,?)', [data?.name, hashPass, data.email, data.image || "", data.address, data.phone]);
            const users = await this.userRepo.find();
            const user_id = users[users.length - 1]?.user_id;
            const token = this.jwtService.sign(user_id.toString());
            const response = res.cookie('verify-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            return this.mailService.sendMail(data?.email, token, response);
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Internal Server');
        }
    }
    async loginView(data, res) {
        try {
            const [rows] = await this.userRepo.query('SELECT * FROM user WHERE email = ?', [data.email]);
            const user = rows;
            if (!user?.name) {
                return res.status(400).json({
                    status: false,
                    message: "Account not exists"
                });
            }
            const match = await bycrpt.compare(data?.password, user?.password);
            if (!match) {
                return res.json({
                    status: false,
                    message: "Invalid credintials"
                });
            }
            const token = this.jwtService.sign(`${user.user_id}`);
            res.cookie('auth-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            const response = res.cookie('verify-token', "", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            return response.json({
                status: true,
                message: "Login Successfully",
                data: {
                    name: user?.name,
                    email: user?.email,
                    image: user?.image,
                    address: user.address,
                    phone: user?.phone
                }
            });
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Internal Server');
        }
    }
    async updateUser(id, data) {
        try {
            const [exists] = await this.userRepo.query('SELECT * FROM user WHERE user_id!=? AND email=?', [id, data?.email]);
            if (exists?.name) {
                return {
                    status: false,
                    message: "Email Already Exists"
                };
            }
            const { sql, values } = await (0, userUpdateSql_1.generateUpdateSqlUser)(data, 'user', id);
            const rows = await this.userRepo.query(sql, values);
            const [user] = await this.userRepo.query('SELECT name,email,address,image,phone FROM user WHERE user_id=? AND email=?', [id, data?.email]);
            return {
                status: true,
                message: "Update successfully",
                user
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.InternalServerErrorException('Internal Server');
        }
    }
    async changePassword(oldPass, newPass, req) {
        try {
            const token = req.cookies['auth-token'];
            const user_id = this.jwtService.decode(token);
            const user = await this.userRepo.query('SELECT * FROM user WHERE user_id=?', [user_id]);
            const match = await bycrpt.compare(oldPass, user[0]?.password);
            if (!match) {
                return new common_1.BadRequestException('Password not match');
            }
            const hashPass = await bycrpt.hash(newPass, 10);
            await this.userRepo.query('UPDATE user SET password=? WHERE user_id=?', [hashPass, user_id]);
            return {
                status: true,
                message: "Password Reset Successfully"
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Internal Server');
        }
    }
    async verifyUser(id) {
        try {
            const user_id = this.jwtService.decode(id);
            if (user_id == null) {
                return {
                    status: false,
                    message: "User id is not valid"
                };
            }
            await this.userRepo.query('UPDATE user SET verified=? WHERE user_id=?', [true, user_id]);
            return {
                status: true,
                message: "User verified Successfully",
            };
        }
        catch (error) {
            return {
                status: false,
                message: "Something went wrong",
            };
        }
    }
    async getSingleUserDetails(id) {
        try {
            const [user] = await this.userRepo.query("SELECT name,image,email,phone FROM user WHERE user_id=?", [id]);
            return user;
        }
        catch (error) {
            return {
                status: false,
                message: "Server Error"
            };
        }
    }
    async socialLogin(data, res) {
        try {
            const [exists] = await this.userRepo.query('SELECT * from user WHERE email=?', [data.email]);
            if (exists) {
                const token = this.jwtService.sign(`${exists.user_id}`);
                res.cookie('auth-token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
                const response = res.cookie('verify-token', "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
                return response.json({
                    status: true,
                    message: "Login Successfully",
                    data: {
                        name: exists?.name,
                        email: exists?.email,
                        image: exists?.image,
                        address: exists.address,
                        phone: exists?.phone
                    }
                });
            }
            await this.userRepo.query('INSERT INTO `user`(`name`,  `email`, `image`,`verified`) VALUES (?,?,?,?)', [data?.name, data.email, data.image || "", true]);
            const rows = await this.userRepo.query('SELECT * from user');
            const user = rows[rows?.length - 1];
            const token = this.jwtService.sign(`${user.user_id}`);
            res.cookie('auth-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            const response = res.cookie('verify-token', "", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            return response.json({
                status: true,
                message: "Login Successfully",
                data: {
                    name: user?.name,
                    email: user?.email,
                    image: user?.image,
                    address: user.address,
                    phone: user?.phone
                }
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException("Server error!");
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService, mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map