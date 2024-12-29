import { JwtService } from '@nestjs/jwt';
import { Review } from 'src/entitys/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/create-review-dto';
export declare class ReviewService {
    private reviewRepo;
    private jwtService;
    constructor(reviewRepo: Repository<Review>, jwtService: JwtService);
    createReview(data: ReviewDto, user_id: number): Promise<{
        status: boolean;
        message: string;
    }>;
    getReviewsByHouseId(house_id: number): Promise<any>;
}
