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
exports.HouseController = void 0;
const common_1 = require("@nestjs/common");
const house_dto_1 = require("./dto/house.dto");
const house_service_1 = require("./house.service");
const jwt_1 = require("@nestjs/jwt");
const send_mail_dto_1 = require("./dto/send-mail-dto");
let HouseController = class HouseController {
    constructor(houseService, jwtService) {
        this.houseService = houseService;
        this.jwtService = jwtService;
    }
    createPost(data, req) {
        const jwtToken = req?.cookies['auth-token'];
        const user_id = this.jwtService.decode(jwtToken);
        return this.houseService.createHouse(data, user_id);
    }
    findALL(searchParams) {
        return this.houseService.getAllHouses(searchParams);
    }
    deleteHouse(id) {
        return this.houseService.deleteHouse(id);
    }
    updateHouse(data, id) {
        return this.houseService.updateHouse(data, id);
    }
    getOne(id) {
        return this.houseService.getSingleHouse(id);
    }
    sendMailclient(data, res) {
        return this.houseService.sendEmailToClient(data.from, data.to, data.message, data.name, res);
    }
    getHouseUsingUserId(req) {
        const jwtToken = req?.cookies['auth-token'];
        const user_id = this.jwtService.decode(jwtToken);
        return this.houseService.getHouseUsingUserId(user_id);
    }
};
exports.HouseController = HouseController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [house_dto_1.HouseType, Object]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "findALL", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "deleteHouse", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "updateHouse", null);
__decorate([
    (0, common_1.Get)("single/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('send-mail'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_mail_dto_1.SendMailDto, Object]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "sendMailclient", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HouseController.prototype, "getHouseUsingUserId", null);
exports.HouseController = HouseController = __decorate([
    (0, common_1.Controller)('/api/house'),
    __metadata("design:paramtypes", [house_service_1.HouseService, jwt_1.JwtService])
], HouseController);
//# sourceMappingURL=house.controller.js.map