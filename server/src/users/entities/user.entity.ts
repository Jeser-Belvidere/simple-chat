import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @CreateDateColumn()
  created_at: string;
}
