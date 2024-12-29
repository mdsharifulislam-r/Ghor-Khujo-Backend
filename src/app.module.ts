import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseModule } from './house/house.module';
import { LoggerMiddleware } from './common/middleswares/logger/logger.middleware';
import { MailModule } from './mail/mail.module';
import { ReviewModule } from './review/review.module';


@Module({
  imports: [JwtModule.register({
    global:true,
    secret:"runabinteanamul",
    signOptions:{
    
    }
  }), UserModule,
  TypeOrmModule.forRoot({
    type: 'mysql', 
    host:"btnlkjfeqjfj0gvsdcc0-mysql.services.clever-cloud.com",
    port: 3306,
    username: "u9esawecvdnwauqf",
    password: "qGdCimsddDefTPS6nFsL", 
    database: "btnlkjfeqjfj0gvsdcc0", 
    entities: [__dirname + '/**/*.entity{.ts,.js}'], 
  }),
  HouseModule,
  MailModule,
  ReviewModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path:'/api/house/create',
      method:RequestMethod.POST
    })
    consumer.apply(LoggerMiddleware).forRoutes({
      path:'/api/house/update/:id',
      method:RequestMethod.PUT
    })
    consumer.apply(LoggerMiddleware).forRoutes({
      path:'/api/house/delete/:id',
      method:RequestMethod.DELETE
    })
    consumer.apply(LoggerMiddleware).forRoutes({
      path:"api/auth/update",
      method:RequestMethod.PUT
    })
    consumer.apply(LoggerMiddleware).forRoutes({
      path:"api/auth/chnage-password",
      method:RequestMethod.PUT
    })
    consumer.apply(LoggerMiddleware).forRoutes({
      path:"api/review/post",
      method:RequestMethod.POST
    })
    consumer.apply(LoggerMiddleware).forRoutes({
      path:"api/house/user",
      method:RequestMethod.GET
    })
  }
}
