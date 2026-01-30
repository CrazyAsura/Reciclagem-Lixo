import { Column, Entity, OneToMany, ObjectIdColumn } from "typeorm";
import { ObjectId } from 'mongodb';
import { Phone } from "../../phone/entities/phone.entity";
import { Address } from "../../address/entities/address.entity";
import { ROLE } from "../../common/enum/roles";
import { Notification } from "../../notification/entities/notification.entity";

@Entity('users')
export class User {
    @ObjectIdColumn()
    id: ObjectId;
    @Column({ unique: true })
    cpf: string;
    @Column()
    name: string;
    @Column()
    birthDate: string;
    @Column()
    gender: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    
    @Column({
        type: 'enum',
        enum: ROLE,
        default: ROLE.USER,
    })
    role: ROLE;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    photo: string;

    @Column({ nullable: true })
    token: string | null;

    @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
    phones: Phone[];
    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    addresses: Address[];
    
    @OneToMany(() => Notification, (notification) => notification.user, { cascade: true })
    notifications: Notification[];
}
