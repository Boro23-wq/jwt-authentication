import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  username: string;

  @Field()
  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('int', { default: 1 })
  tokenVersion: number;
}
