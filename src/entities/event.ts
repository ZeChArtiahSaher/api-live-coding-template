import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column()
  type: string;

  @Column()
  page: string;

  @Column()
  platform: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;
}