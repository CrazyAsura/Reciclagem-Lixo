import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { ObjectId } from 'mongodb';
import { User } from "../../user/entities/user.entity";

@Entity('notifications')
export class Notification {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column({ default: false })
    read: boolean;

    @Column()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;
    
    @Column()
    userId: string;
}