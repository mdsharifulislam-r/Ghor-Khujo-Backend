import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/entitys/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { SocialLoginDto } from './dto/soclial-login-dto';
export declare class UserService {
    private userRepo;
    private jwtService;
    private mailService;
    constructor(userRepo: Repository<User>, jwtService: JwtService, mailService: MailService);
    registerUser(data: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>> | {
        statusCode: number;
        message: string[];
    } | InternalServerErrorException>;
    loginView(data: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>> | InternalServerErrorException>;
    updateUser(id: string, data: RegisterUserDto): Promise<InternalServerErrorException | {
        status: boolean;
        message: string;
        user?: undefined;
    } | {
        status: boolean;
        message: string;
        user: any;
    }>;
    changePassword(oldPass: string, newPass: string, req: Request): Promise<BadRequestException | {
        status: boolean;
        message: string;
    }>;
    verifyUser(id: string): Promise<{
        status: boolean;
        message: string;
    }>;
    getSingleUserDetails(id: string): Promise<any>;
    socialLogin(data: SocialLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
