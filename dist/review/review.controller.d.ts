import { ReviewService } from './review.service';
import { ReviewDto } from './dto/create-review-dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class ReviewController {
    private reviewService;
    private jwtService;
    constructor(reviewService: ReviewService, jwtService: JwtService);
    postReview(data: ReviewDto, req: Request): Promise<{
        status: boolean;
        message: string;
    }>;
    getReviewsUsingHouseId(id: number): Promise<any>;
}
