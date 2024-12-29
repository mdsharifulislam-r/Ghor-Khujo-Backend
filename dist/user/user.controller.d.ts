import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ChangePassDto } from './dto/change-pass.dto';
import { SocialLoginDto } from './dto/soclial-login-dto';
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(data: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>> | {
        statusCode: number;
        message: string[];
    } | import("@nestjs/common").InternalServerErrorException>;
    loginView(data: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>> | import("@nestjs/common").InternalServerErrorException>;
    logout(res: Response): void;
    updateUser(data: any, req: Request): Promise<import("@nestjs/common").InternalServerErrorException | {
        status: boolean;
        message: string;
        user?: undefined;
    } | {
        status: boolean;
        message: string;
        user: any;
    }>;
    verifyUser(id: string): Promise<{
        status: boolean;
        message: string;
    }>;
    changePass(data: ChangePassDto, req: Request): Promise<import("@nestjs/common").BadRequestException | {
        status: boolean;
        message: string;
    }>;
    getOne(id: string): Promise<any>;
    socialLogin(data: SocialLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
