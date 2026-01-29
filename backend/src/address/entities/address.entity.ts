import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { ObjectId } from 'mongodb';
import { User } from "../../user/entities/user.entity";

@Entity('addresses')
export class Address {
    @ObjectIdColumn()
    id: ObjectId;
    @Column()
    zipCode: string;
    @Column()
    number: string;
    @Column({ nullable: true })
    complement: string;
    @Column()
    street: string;
    @Column() 
    neighborhood: string;
    @Column()
    city: string;
    @Column()
    state: string;
    @Column()
    country: string;
    @ManyToOne(() => User, (user) => user.addresses)
    user: User;
}
