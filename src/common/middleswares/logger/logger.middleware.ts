import { Injectable, NestMiddleware, Req} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private jwtService:JwtService){}
 async use(req: Request, res: Response, next: () => void) {
    try {
      const token = req.cookies['auth-token']
      const isVarify =await this.jwtService.verifyAsync(token)
     
      if(isVarify){
        next()
      }else{
        res.status(400).json({
          status:false,
          message:["Token is expired"]
        })
      }
      
    } catch (error) {
      res.status(500).json({
        status:false,
        message:["Token is Expired"]
      })
    }
  }
}
