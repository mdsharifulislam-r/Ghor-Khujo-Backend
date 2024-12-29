import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class House{

    @PrimaryGeneratedColumn()
    house_id:number

    @Column()
    user_id:number

    @Column()
    house_name:string

    @Column()
    title:string

    @Column({length:1000})
    description:string

    @Column()
    rent:number

    @Column()
    address:string

    @Column()
    tags:string

    @Column()
    phone:string

    @Column()
    image:string

    @Column()
    side_images:string

    @Column()
    capacity:string

    @Column()
    for:string

    @Column()
    type:string

    @Column()
    owner_name:string

    @Column()
    publishDate:string
    
}