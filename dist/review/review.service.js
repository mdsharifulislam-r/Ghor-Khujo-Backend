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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("../entitys/review.entity");
const typeorm_2 = require("typeorm");
let ReviewService = class ReviewService {
    constructor(reviewRepo, jwtService) {
        this.reviewRepo = reviewRepo;
        this.jwtService = jwtService;
    }
    async createReview(data, user_id) {
        try {
            await this.reviewRepo.query('INSERT INTO `review`(`house_id`, `star`, `date`, `message`,`user_id`) VALUES (?,?,?,?,?)', [data.house_id, data.star, data.date, data.message, user_id]);
            return {
                status: true,
                message: "Review Post Successfully"
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server error!');
        }
    }
    async getReviewsByHouseId(house_id) {
        try {
            const [house] = await this.reviewRepo.query('SELECT * FROM house WHERE house_id=?', [house_id]);
            if (!house?.house_id) {
                throw new common_1.NotFoundException('House Not Found');
            }
            const reviews = await this.reviewRepo.query('SELECT * FROM review WHERE house_id=?', [house_id]);
            return reviews;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server error!');
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], ReviewService);
//# sourceMappingURL=review.service.js.map