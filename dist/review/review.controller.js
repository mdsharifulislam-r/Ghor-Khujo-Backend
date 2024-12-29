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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const create_review_dto_1 = require("./dto/create-review-dto");
const jwt_1 = require("@nestjs/jwt");
let ReviewController = class ReviewController {
    constructor(reviewService, jwtService) {
        this.reviewService = reviewService;
        this.jwtService = jwtService;
    }
    postReview(data, req) {
        const jwtToken = req?.cookies['auth-token'];
        const user_id = this.jwtService.decode(jwtToken);
        return this.reviewService.createReview(data, user_id);
    }
    getReviewsUsingHouseId(id) {
        return this.reviewService.getReviewsByHouseId(id);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.ReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "postReview", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getReviewsUsingHouseId", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('api/review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService, jwt_1.JwtService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map