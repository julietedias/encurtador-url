import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'urls' })
export class UrlEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'original_url' })
  originalUrl: string;

  @Column({ name: 'short_code', length: 6, unique: true })
  shortCode: string;

  @Column({ default: 0 })
  clicks: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.urls, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
