import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entitys/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/create-review-dto';
import { Request } from 'express';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(Review) private reviewRepo:Repository<Review>,private jwtService:JwtService){}

    async createReview(data:ReviewDto,user_id:number){
        try {
            await this.reviewRepo.query('INSERT INTO `review`(`house_id`, `star`, `date`, `message`,`user_id`) VALUES (?,?,?,?,?)',[data.house_id,data.star,data.date,data.message,user_id])
            return {
                status:true,
                message:"Review Post Successfully"
            }
        } catch (error) {
         
            
            throw new InternalServerErrorException('Server error!')
        }
    }

    async getReviewsByHouseId(house_id:number){
        try {
            const [house]=await this.reviewRepo.query('SELECT * FROM house WHERE house_id=?',[house_id])
            if(!house?.house_id){
                throw new NotFoundException('House Not Found')
            }

            const reviews = await this.reviewRepo.query('SELECT * FROM review WHERE house_id=?',[house_id])
            return reviews
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException('Server error!')
        }
    }
}
