import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { ViewUserDto } from '@users/dto/view-user.dto';
import { ConfigService } from '@nestjs/config';
import { ENV_ENUM } from '@/common/types/env.types';
import { Repository } from 'typeorm';
import { FindOneParams } from '@users/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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
    const SALT = this.configService.get<string>(ENV_ENUM.SALT) as string;

    const { username, password } = createUserDto;

    const hash = await bcrypt.hash(password, +SALT);

    if (
      await this.userRepository.findOne({
        where: { username: username },
      })
    )
      throw new BadRequestException('User has already exist');

    const user = this.userRepository.create({
      username: username,
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
