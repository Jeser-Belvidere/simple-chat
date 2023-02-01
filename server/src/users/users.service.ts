import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { ViewUserDto } from '@users/dto/view-user.dto';
import { Repository } from 'typeorm';
import { FindOneParams } from '@users/types';

import * as bcrypt from 'bcrypt';

const SALT = parseInt(process.env.SALT || '10', 10);
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ username, id }: FindOneParams): Promise<User | never> {
    const user = await this.userRepository.findOne({
      where: username ? { username: username } : { id: id },
    });

    if (!user) throw new NotFoundException(`User #${username} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, SALT);

    const user = this.userRepository.create({
      username: createUserDto.username,
      hash: hash,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne({ id });
    return this.userRepository.remove(user);
  }
}
