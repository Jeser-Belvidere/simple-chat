import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { text, userId } = createMessageDto;

    const createdBy = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (createdBy === null) throw new NotFoundException(`User ${userId} not found`);

    const message = this.messageRepository.create(createMessageDto);
    message.createdBy = createdBy;

    return this.messageRepository.save(message);
  }

  findAll() {
    return this.messageRepository.find({
      relations: {
        createdBy: true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} message`;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.preload({
      id: id,
      ...updateMessageDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.messageRepository.save(message);
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
