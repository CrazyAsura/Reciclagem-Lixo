import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { ObjectId } from 'mongodb';
import { User } from "../../user/entities/user.entity";

@Entity('phones')
export class Phone {
    @ObjectIdColumn()
    id: ObjectId;
    @Column()
    ddi: string;
    @Column()
    ddd: string;
    @Column()
    number: string;
    @ManyToOne(() => User, (user) => user.phones)
    user: User;
}
