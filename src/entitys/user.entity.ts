import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    name:string

    @Column({unique:true})
    email:string
    
    @Column()
    password:string

    @Column()
    image:string
    @Column()
    address:string

    @Column()
    phone:string

    @Column({default:false})
    verified:boolean
    
}