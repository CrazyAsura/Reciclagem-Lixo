import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressRepository.save(createAddressDto);
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: string) {
    return this.addressRepository.findOne({ where: { id: new ObjectId(id) } });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(new ObjectId(id), updateAddressDto);
  }

  remove(id: string) {
    return this.addressRepository.delete(new ObjectId(id));
  }
}
