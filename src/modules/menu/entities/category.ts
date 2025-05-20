import { BaseEntity } from "@common/entities/base";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MenuItem } from "./menu-item";


@Entity('categories')
export class Category extends BaseEntity{
     @Column()
     name!:string

     @Column()
     description!:string

     @Column({nullable: true, default: 0})
     displayOrder?:number



     @OneToMany(()=> MenuItem, menuItem => menuItem.category)
     menu?:MenuItem[]


}