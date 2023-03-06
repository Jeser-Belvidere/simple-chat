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
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Index()
  @Column()
  username: string;

  @Column({ nullable: true, default: null })
  firstname: string;

  @Column({ nullable: true, default: null })
  lastname: string;

  @Column()
  hash: string;

  @OneToMany(() => Message, (Message) => Message.createdBy)
  messages: Message[];

  @CreateDateColumn()
  createdAt: string;
}
