import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class HouseType{
    house_id:number
    user_id:number
    
    @IsNotEmpty()
    @IsString()
    house_name:string

    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    desc:string

    @IsNotEmpty()
    @IsNumber()
    rent:number

    @IsNotEmpty()
    @IsString()
    address:string

    @IsNotEmpty()
    @IsArray()
    tags:string[]

    owner_name:string

    @IsNotEmpty()
    @IsString()
    phone:string

    @IsNotEmpty()
    @IsString()
    image:string

    side_images:string

    capacity:string

    for:"bachlor"|"family"|"any"
    type:"flat" | "sublet"

    
    publishDate:string
}