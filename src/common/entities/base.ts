import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({name : 'created_at'})
    created_at?:Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at?:Date

    @DeleteDateColumn({name: 'deleted_at'})
    deleted_at?:Date
}