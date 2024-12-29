import { HouseType } from './dto/house.dto';
import { HouseService } from './house.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SendMailDto } from './dto/send-mail-dto';
export declare class HouseController {
    private houseService;
    private jwtService;
    constructor(houseService: HouseService, jwtService: JwtService);
    createPost(data: HouseType, req: Request): Promise<import("@nestjs/common").InternalServerErrorException | {
        statusCode: number;
        message: string[];
    }>;
    findALL(searchParams: any): Promise<import("@nestjs/common").InternalServerErrorException | import("../entitys/home.entity").House[]>;
    deleteHouse(id: string): Promise<import("@nestjs/common").HttpException | {
        status: boolean;
        message: string;
    }>;
    updateHouse(data: any, id: string): Promise<import("@nestjs/common").InternalServerErrorException | import("@nestjs/common").BadRequestException | {
        status: boolean;
        message: string;
    }>;
    getOne(id: string): Promise<any>;
    sendMailclient(data: SendMailDto, res: Response): Promise<void>;
    getHouseUsingUserId(req: Request): Promise<any>;
}
