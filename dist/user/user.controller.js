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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const register_user_dto_1 = require("./dto/register-user.dto");
const user_service_1 = require("./user.service");
const login_user_dto_1 = require("./dto/login-user.dto");
const jwt_1 = require("@nestjs/jwt");
const change_pass_dto_1 = require("./dto/change-pass.dto");
const soclial_login_dto_1 = require("./dto/soclial-login-dto");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    register(data, res) {
        return this.userService.registerUser(data, res);
    }
    loginView(data, res) {
        return this.userService.loginView(data, res);
    }
    logout(res) {
        const response = res.cookie('auth-token', "");
        response.status(200).json({
            status: true,
            message: "Logout Successfull"
        });
    }
    updateUser(data, req) {
        const jwtToken = req?.cookies['auth-token'];
        const user_id = this.jwtService.decode(jwtToken);
        return this.userService.updateUser(user_id, data);
    }
    verifyUser(id) {
        return this.userService.verifyUser(id);
    }
    changePass(data, req) {
        return this.userService.changePassword(data.oldPassword, data.newPassword, req);
    }
    getOne(id) {
        return this.userService.getSingleUserDetails(id);
    }
    socialLogin(data, res) {
        return this.userService.socialLogin(data, res);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "loginView", null);
__decorate([
    (0, common_1.Delete)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('verify/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Put)('chnage-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_pass_dto_1.ChangePassDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePass", null);
__decorate([
    (0, common_1.Get)('single-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('social-login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [soclial_login_dto_1.SocialLoginDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "socialLogin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map