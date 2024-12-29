import { IsNotEmpty } from "class-validator";

export class ReviewDto{

  
    review_id:number;


    user_id:number

    @IsNotEmpty()
    house_id:number

    @IsNotEmpty()
    star:number

    @IsNotEmpty()
    date:string

    @IsNotEmpty()
    message:string
}
