import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entitys/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bycrpt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { generateUpdateSqlUser } from 'src/lib/helper/userUpdateSql';
import { MailService } from 'src/mail/mail.service';
import { SocialLoginDto } from './dto/soclial-login-dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo:Repository<User>,private jwtService:JwtService,private mailService:MailService){}

    async registerUser(data:RegisterUserDto,res:Response){
        try {
            const rows = await this.userRepo.query('SELECT * FROM user WHERE email = ?',[data.email])
            if(rows[0]?.name){
                return res.status(400).json({
                    statusCode:400,
                    error:"Bad Request",
                    message:["Account Already Exists"]
                })
            }

            if(data.password.length<8){
                return res.status(400).json({
                    statusCode:400,
                    error:"Bad Request",
                    message:["Password in less then 8 charachter"]
                })
            }
            const hashPass = await bycrpt.hash(data.password,10)
            await this.userRepo.query('INSERT INTO `user`(`name`, `password`, `email`, `image`, `address`, `phone`) VALUES (?,?,?,?,?,?)',[data?.name,hashPass,data.email,data.image||"",data.address,data.phone])
            const users = await this.userRepo.find()
            const user_id = users[users.length-1]?.user_id
            
            const token = this.jwtService.sign(user_id.toString())
            const response= res.cookie('verify-token',token,{
                httpOnly:true,
                secure:true,
                sameSite:"none"
               })
            return this.mailService.sendMail(data?.email,token,response)
        } catch (error) {
            console.log(error);
            
            return new InternalServerErrorException('Internal Server')
        }
    }

    async loginView(data:LoginUserDto,res:Response){
        try {
            const [rows]:any = await this.userRepo.query('SELECT * FROM user WHERE email = ?',[data.email])
            const user:RegisterUserDto = rows
            if(!user?.name){
                return res.status(400).json({
                    status:false,
                    message:"Account not exists"
                })
            }

            const match = await bycrpt.compare(data?.password,user?.password)

            if(!match){
                return res.json({
                    status:false,
                    message:"Invalid credintials"
                })
            }


            const token = this.jwtService.sign(`${user.user_id}`)
           res.cookie('auth-token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
           })

           const response = res.cookie('verify-token',"",{
            httpOnly:true,
            secure:true,
            sameSite:"none"
           })

            return response.json({
                status:true,
                message:"Login Successfully",
                data:{
                    name:user?.name,
                    email:user?.email,
                    image:user?.image,
                    address:user.address,
                    phone:user?.phone
                }
            })


        } catch (error) {
            console.log(error);
            
            return new InternalServerErrorException('Internal Server')
        }
    }

    async updateUser(id:string,data:RegisterUserDto){
        try {
            const [exists]=await this.userRepo.query('SELECT * FROM user WHERE user_id!=? AND email=?',[id,data?.email])
            if(exists?.name){
                return{
                    status:false,
                    message:"Email Already Exists"
                }
            }
            const {sql,values} = await generateUpdateSqlUser(data,'user',id)
            const rows = await this.userRepo.query(sql,values)

            const [user]= await this.userRepo.query('SELECT name,email,address,image,phone FROM user WHERE user_id=? AND email=?',[id,data?.email])
            
            return {
                status:true,
                message:"Update successfully",
                user
            }
        } catch (error) {
            console.log(error);
            
            return new InternalServerErrorException('Internal Server')
        }
    }

    async changePassword(oldPass:string,newPass:string,req:Request){
       try {
        const token = req.cookies['auth-token']
        const user_id = this.jwtService.decode(token)
        const user= await this.userRepo.query('SELECT * FROM user WHERE user_id=?',[user_id])
        const match = await bycrpt.compare(oldPass,user[0]?.password)
        if(!match){
            return new BadRequestException('Password not match')
        }

        const hashPass = await bycrpt.hash(newPass,10)
        
        await this.userRepo.query('UPDATE user SET password=? WHERE user_id=?',[hashPass,user_id])

        return {
            status:true,
            message:"Password Reset Successfully"
        }
       } catch (error) {
        throw new InternalServerErrorException('Internal Server')
       }
    }

    async verifyUser(id:string){
       try {
        const user_id = this.jwtService.decode(id)
        if(user_id==null){
            return {
                status:false,
                message:"User id is not valid"
            }
        }
        
        await this.userRepo.query('UPDATE user SET verified=? WHERE user_id=?',[true,user_id])
        return {
            status:true,
            message:"User verified Successfully",
        }
       } catch (error) {
        return {
            status:false,
            message:"Something went wrong",
        }
       }
    }

    async getSingleUserDetails(id:string){
        try {
            const [user]= await this.userRepo.query("SELECT name,image,email,phone FROM user WHERE user_id=?",[id])
            return user
        } catch (error) {
            return {
                status:false,
                message:"Server Error"
            }
        }
    }

    async socialLogin(data:SocialLoginDto,res:Response){
        try {
            const [exists]= await this.userRepo.query('SELECT * from user WHERE email=?',[data.email])
            if(exists){
                const token = this.jwtService.sign(`${exists.user_id}`)
                res.cookie('auth-token',token,{
                 httpOnly:true,
                 secure:true,
                 sameSite:"none"
                })
     
                const response = res.cookie('verify-token',"",{
                 httpOnly:true,
                 secure:true,
                 sameSite:"none"
                })
     
                 return response.json({
                     status:true,
                     message:"Login Successfully",
                     data:{
                         name:exists?.name,
                         email:exists?.email,
                         image:exists?.image,
                         address:exists.address,
                         phone:exists?.phone
                     }
                 })
            }

            await this.userRepo.query('INSERT INTO `user`(`name`,  `email`, `image`,`verified`) VALUES (?,?,?,?)',[data?.name,data.email,data.image||"",true])

            const rows = await this.userRepo.query('SELECT * from user')

            const user = rows[rows?.length-1]
            const token = this.jwtService.sign(`${user.user_id}`)
            res.cookie('auth-token',token,{
             httpOnly:true,
             secure:true,
             sameSite:"none"
            })
 
            const response = res.cookie('verify-token',"",{
             httpOnly:true,
             secure:true,
             sameSite:"none"
            })
 
             return response.json({
                 status:true,
                 message:"Login Successfully",
                 data:{
                     name:user?.name,
                     email:user?.email,
                     image:user?.image,
                     address:user.address,
                     phone:user?.phone
                 }
             })

        } catch (error) {
            console.log(error);
            
        throw new InternalServerErrorException("Server error!")
        }
    }


}
