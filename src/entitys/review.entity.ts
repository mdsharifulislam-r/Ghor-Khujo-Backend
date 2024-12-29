import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review{

    @PrimaryGeneratedColumn()
    review_id:number;

    @Column()
    user_id:number

    @Column()
    house_id:number

    @Column()
    star:number

    @Column()
    date:string

    @Column()
    message:string
}
