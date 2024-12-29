import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from 'src/entitys/home.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports:[TypeOrmModule.forFeature([House])],
  controllers: [HouseController],
  providers: [HouseService,MailService]
})
export class HouseModule {}
