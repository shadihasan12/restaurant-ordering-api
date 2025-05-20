import { BaseEntity } from "@common/entities/base";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./category";



@Entity('menu_items')
export class MenuItem extends BaseEntity{

    @Column()
    name!:string

    @Column()
    description!:string


    @Column({type: 'decimal', precision: 10, scale: 2})
    price!: number;

    @Column({nullable: true})
    imageUrl?: string;

    @Column({default: true})
    isAvailable?: boolean;

    @Column({type: 'int'})
    preparationTime!: number;   
    
    @ManyToOne(()=>Category, category => category.menu)
    @JoinColumn({name: 'category_id'})
    category?: Category; 
    
    @Column()
    category_id!: string;

}