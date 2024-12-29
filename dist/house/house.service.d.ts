import { BadRequestException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { HouseType } from './dto/house.dto';
import { House } from 'src/entitys/home.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';
export declare class HouseService {
    private HouseRepo;
    private mailService;
    constructor(HouseRepo: Repository<House>, mailService: MailService);
    createHouse(data: HouseType, user_id: number): Promise<InternalServerErrorException | {
        statusCode: number;
        message: string[];
    }>;
    getAllHouses(searchParams: {
        address?: string;
        for?: string;
        type?: string;
        rent?: string;
        search: string;
        range?: string;
    }): Promise<InternalServerErrorException | House[]>;
    deleteHouse(id: string): Promise<HttpException | {
        status: boolean;
        message: string;
    }>;
    updateHouse(data: any, id: string): Promise<InternalServerErrorException | BadRequestException | {
        status: boolean;
        message: string;
    }>;
    getSingleHouse(id: string): Promise<any>;
    sendEmailToClient(from: string, to: string, message: string, name: string, res: Response): Promise<void>;
    getHouseUsingUserId(id: number): Promise<any>;
}
