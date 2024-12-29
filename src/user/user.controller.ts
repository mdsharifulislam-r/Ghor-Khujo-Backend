import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import * as CookieParser from 'cookie-parser'
import { JwtService } from '@nestjs/jwt';
import { ChangePassDto } from './dto/change-pass.dto';
import { SocialLoginDto } from './dto/soclial-login-dto';
@Controller('api/auth')
export class UserController {
    constructor(private userService:UserService,private jwtService:JwtService){}
    @Post('register')
    register(@Body() data:RegisterUserDto,@Res() res:Response){
        return this.userService.registerUser(data,res)
    }

    @Post('login')
    loginView(@Body() data:LoginUserDto,@Res() res:Response){
       
        
        return this.userService.loginView(data,res)
    }

    @Delete('logout')
    logout(@Res() res:Response){
        const response = res.cookie('auth-token',"")
        response.status(200).json({
            status:true,
            message:"Logout Successfull"
        })
    }

    @Put('update')
    updateUser(@Body() data:any,@Req() req:Request){
        const jwtToken = req?.cookies['auth-token']
        const user_id = this.jwtService.decode(jwtToken)
        return this.userService.updateUser(user_id,data)
    }
    @Put('verify/:id')
    verifyUser(@Param("id") id:string){
        
        
        return this.userService.verifyUser(id)
        
    }


    @Put('chnage-password')
    changePass(@Body() data:ChangePassDto,@Req() req:Request){
        return this.userService.changePassword(data.oldPassword,data.newPassword,req)
    }

    @Get('single-user/:id')
    getOne(@Param('id') id:string){
        return this.userService.getSingleUserDetails(id)
    }

    @Post('social-login')
    socialLogin(@Body() data:SocialLoginDto,@Res() res:Response){
        return this.userService.socialLogin(data,res)
    }
}
