import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SocialLoginDto{

    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsEmail()
    email:string
    image:string
}