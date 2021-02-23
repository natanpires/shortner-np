import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('encurtador')
export class Encurtador {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000 })
  url: string;

  @Exclude()
  @Column({ length: 32, name: 'url_hash' })
  urlHash: string;

  @Exclude()
  @Column({ length: 6 })
  code: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'expires_at',
    default: () => `NOW() + INTERVAL '7 days'`,
    nullable: false,
  })
  expiresAt: Date;

  get shortLink(): string {
    return `http://localhost:8081/{ $code }`;
  }
}
