import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/create-review-dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('api/review')
export class ReviewController {
    constructor(private reviewService:ReviewService,private jwtService:JwtService){}

    @Post('post')
    postReview(@Body() data:ReviewDto,@Req() req:Request){
        const jwtToken = req?.cookies['auth-token']
        const user_id = this.jwtService.decode(jwtToken)
        return this.reviewService.createReview(data,user_id)
    }

    @Get(':id')
    getReviewsUsingHouseId(@Param('id') id:number){
        return this.reviewService.getReviewsByHouseId(id)
    }

}
