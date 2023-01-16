import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Message } from 'src/messages/entities/message.entity';
@Entity('users')
export class User {
  @Index()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Message, (Message) => Message.createdBy)
  messages: Message[];

  @CreateDateColumn()
  createdAt: string;
}
