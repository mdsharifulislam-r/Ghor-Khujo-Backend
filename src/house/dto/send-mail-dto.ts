import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SendMailDto{
    @IsNotEmpty()
    @IsEmail()
    from:string

    @IsNotEmpty()
    @IsEmail()
    to:string

    @IsNotEmpty()
    message:string

    @IsNotEmpty()
    @IsString()
    name:string

}