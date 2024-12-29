import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterUserDto{

    user_id:number
    
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    image:string
    
    @IsNotEmpty()
    @IsString()
    phone:string

    @IsNotEmpty()
    @IsString()
    address:string

    verified:boolean
    
}