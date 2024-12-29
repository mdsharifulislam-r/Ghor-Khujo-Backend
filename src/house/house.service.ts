import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HouseType } from './dto/house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from 'src/entitys/home.entity';
import { Repository } from 'typeorm';
import { generateUpdateSql } from 'src/lib/helper/updateSqlGenerate';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';

@Injectable()
export class HouseService {
  constructor(@InjectRepository(House) private HouseRepo: Repository<House>,private mailService:MailService) {}
  async createHouse(data: HouseType,user_id:number) {
    try {
      const rows = await this.HouseRepo.query(
        'INSERT INTO `house`(`user_id`, `house_name`, `title`, `description`, `rent`, `address`, `tags`, `owner_name`, `phone`, `image`, `side_images`, `capacity`,`for`,`type`,`publishDate`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',
        [
          user_id,
          data.house_name,
          data.title,
          data.desc,
          data.rent,
          data.address,
          data.tags.toString(),
          data.owner_name || '',
          data.phone,
          data.image,
          data.side_images || '',
          data.capacity || '',
          data.for || '',
          data.type || '',
          data.publishDate||''
        ],
      );
      return {
        statusCode:201,
        message:["Home Submited Successfully"]
      }
    } catch (error) {
      console.log(error);

      return new InternalServerErrorException('Server error!');
    }
  }

  async getAllHouses(searchParams: {
    address?: string;
    for?: string;
    type?: string;
    rent?:string;
    search:string,
    range?:string
  }) {
    try {
      const rows = await this.HouseRepo.find();
      if (!Object.keys(searchParams).length) {
        return rows;
      }
      if(searchParams.search){
        const search = searchParams.search.toLowerCase()
        return rows.filter(item=>{
            return (item.tags.toLowerCase().split(',').some(item=>search.includes(item)))
             || (item.title.toLowerCase().includes(search))
             ||(item.house_name.toLowerCase().includes(search))
             || (item.address.toLowerCase().includes(search))
        })
      }
      let tempData = rows;
      if (searchParams?.address&&searchParams?.address!=',,') {
        if (searchParams.address.split(',').length == 1) {
          tempData = tempData.filter((item) =>
            item.address
              .toLowerCase()
              .split(',')
              .includes(searchParams.address.toLowerCase()),
          );
        } else {
          tempData = tempData.filter((item) => {
            const addresses = searchParams.address.toLowerCase().split(',');
            const match = item.address
              .toLowerCase()
              .split(',')
              .some((item2) => addresses.includes(item2));
            if (match) {
              return item;
            }
          });
        }
      }
      if (searchParams?.type) {
        tempData = tempData.filter((item) => {
          const addresses = searchParams.type.toLowerCase().split(',');
          const match = item.type
            .toLowerCase()
            .split(',')
            .some((item2) =>addresses.includes(item2));
          if (match) {
            return item;
          }
        });
      }
      if (searchParams?.for) {
        tempData = tempData.filter((item) => {
          const addresses = searchParams.for.toLowerCase().split(',');
          const match = item.for
            .toLowerCase()
            .split(',')
            .some((item2) => addresses.includes(item2));
          if (match) {
            return item;
          }
        });
      }

      if(parseInt(searchParams?.rent)>1000){
        tempData=tempData.filter(item=>item.rent <= parseInt(searchParams.rent))
      }

      if(searchParams.range){
        if(searchParams.range.includes("-")){
            const [first,second]=searchParams.range.split("-").map(Number)
            tempData = tempData.slice(first,second)
        }
        else{
            tempData= tempData.slice(0,parseInt(searchParams.range))
        }
      }


      return tempData.reverse();
    } catch (error) {
      console.log(error);
      
      return new InternalServerErrorException('Server error!');
    }
  }

  async deleteHouse(id:string){
    try {
      const rows = await this.HouseRepo.query('SELECT * FROM house WHERE house_id=?',[id])
      if(!rows?.length){
        return new HttpException(
          'Data not exists',
          HttpStatus.BAD_REQUEST
        )
        
      }
        await this.HouseRepo.query('DELETE FROM house WHERE house_id=?',[id])
        return {
            status:true,
            message:"Delete Successfully"
        }

    } catch (error) {
        console.log(error);

        return new InternalServerErrorException('Server error!'); 
    }
  }

  async updateHouse(data:any,id:string){
   try {
    const rows = await this.HouseRepo.query('SELECT * FROM house WHERE house_id=?',[id])
    if(!rows?.length){
      return new BadRequestException('Data not exisits')
    }

    const {sql,values} = await generateUpdateSql(data,'house',id)

    await this.HouseRepo.query(sql,values)

    return {
        status:true,
        message:"Update Successfully"
    }
   } catch (error) {
    console.log(error);

      return new InternalServerErrorException('Server error!');
   }
  }

  async getSingleHouse(id:string){
    try {
      const [house]=await this.HouseRepo.query('SELECT * FROM house WHERE house_id=?',[id])
    if(!house?.house_id){
      return {
        status:false,
        message:"House not found"
      }
    }
    return house
    } catch (error) {
      throw new InternalServerErrorException("Server error!")
    }
    
  }

  async sendEmailToClient(from:string,to:string,message:string,name:string,res:Response){
    try {
      this.mailService.sendMailClient(to,name,res,message,from)
    } catch (error) {
      throw new InternalServerErrorException("server error")
    }
  }

  async getHouseUsingUserId(id:number){
    try {
      const rows = await this.HouseRepo.query("SELECT * FROM house WHERE user_id=?",[id])
      return rows
    } catch (error) {
      throw new InternalServerErrorException("server error")
    }
  }
}

