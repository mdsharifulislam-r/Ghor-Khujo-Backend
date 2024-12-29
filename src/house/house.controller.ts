import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, Search } from '@nestjs/common';
import { HouseType } from './dto/house.dto';
import { HouseService } from './house.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SendMailDto } from './dto/send-mail-dto';

@Controller('/api/house')
export class HouseController {
    constructor(private houseService:HouseService,private jwtService:JwtService){}
    @Post('create')
    createPost(@Body() data:HouseType,@Req() req:Request){
        const jwtToken = req?.cookies['auth-token']
        const user_id = this.jwtService.decode(jwtToken)
        return this.houseService.createHouse(data,user_id)
        
    }
    
    @Get()
    findALL(@Query() searchParams:any){
        return this.houseService.getAllHouses(searchParams)
    }

    @Delete("delete/:id")
    deleteHouse(@Param('id') id:string){
    
        
        return this.houseService.deleteHouse(id)
    }

    @Put("update/:id")
    updateHouse(@Body() data, @Param('id') id:string){
        return this.houseService.updateHouse(data,id)
    }

    @Get("single/:id")
    getOne(@Param('id') id:string){
        return this.houseService.getSingleHouse(id)
    }

    @Post('send-mail')
    sendMailclient(@Body() data:SendMailDto,@Res() res:Response){
        return this.houseService.sendEmailToClient(data.from,data.to,data.message,data.name,res)
    }

    @Get('user')
    getHouseUsingUserId(@Req() req:Request){
        const jwtToken = req?.cookies['auth-token']
        const user_id = this.jwtService.decode(jwtToken)
        return this.houseService.getHouseUsingUserId(user_id)
    }
}
