import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>
  ) {}

  create(createPhoneDto: CreatePhoneDto) {
    return this.phoneRepository.save(createPhoneDto);
  }

  findAll() {
    return this.phoneRepository.find();
  }

  findOne(id: string) {
    return this.phoneRepository.findOne({ where: { id: new ObjectId(id) } });
  }

  update(id: string, updatePhoneDto: UpdatePhoneDto) {
    return this.phoneRepository.update(new ObjectId(id), updatePhoneDto);
  }

  remove(id: string) {
    return this.phoneRepository.delete(new ObjectId(id));
  }
}
