import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('messages')
export class Message {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.messages)
  createdBy: User;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: string;
}
