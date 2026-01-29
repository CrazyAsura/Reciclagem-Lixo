import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { EditProfileAuthDto } from './dto/edit-profile-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Phone } from '../phone/entities/phone.entity';
import { Address } from '../address/entities/address.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>, 
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password, role, isActive } = loginAuthDto;
    const user = await this.authRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await this.jwtService.signAsync({
      id: user.id.toString(),
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    })

    return {
      user,
      token,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, password, role, isActive, phones, addresses } = registerAuthDto;

    const user = await this.authRepository.findOne({
      where: {
        email,
      },
    })

    if (user) {
      throw new Error('User already exists');
    }

    const { name, cpf, birthDate, gender } = registerAuthDto;

    return this.authRepository.save({
      name, 
      cpf,
      birthDate,
      gender,
      email,
      password: await argon2.hash(password),
      role,
      isActive,
      phones,
      addresses,
    });  
  }

  async logout(logoutAuthDto: LogoutAuthDto) {
    return this.authRepository.update(new ObjectId(logoutAuthDto.id), {
      token: null,
    });
  }

  async getProfile(id: string) {
    return this.authRepository.findOne({
      where: {
        id: new ObjectId(id),
      },
    })
  }

  async editProfile(editProfileAuthDto: EditProfileAuthDto){
    const { id, email, password, role, isActive } = editProfileAuthDto;
    const user = await this.authRepository.findOne({
      where: {
        id: new ObjectId(id),
      },
    })
    if (!user) {
      throw new Error('User not found');
    }
    return this.authRepository.update(id.toString(), {
      email,
      password: await argon2.hash(password),
      role,
      isActive,
    });
  }
}
