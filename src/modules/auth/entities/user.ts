import { Exclude } from "class-transformer";
import {  BeforeInsert, Column , Index } from "typeorm";

import bcrypt from "bcrypt";
import { BaseEntity } from "../../../common/entities/base";

export enum UserRole {
    CUSTOMER = "customer",
    STAFF = "staff",
    MANAGER =  "manager",
    ADMIN = "admin"
}

export class User extends BaseEntity {
    @Column()
    firstName!:string;

    @Column()
    lastName!:string;
    
    
    @Column()
    @Index({unique: true})
    email!:string;


    @Column()
    @Index({unique: true})
    phone!:string;
    
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role!: UserRole;
    
    @Column()
    @Exclude({ toPlainOnly: true})
    passwordHash!:string;

    @Column({nullable:true})
    lastLogin?:Date

    @Column({nullable:true})
    isActive?:true

    private temPassword?:string;

    set password(password:string) {
         this.temPassword = password;
    }

    @BeforeInsert()
     async hasPassword(){
        if (this.temPassword) {
          const salt = await bcrypt.genSalt(10)  
          this.passwordHash = await bcrypt.hash(this.temPassword, salt);
            
        }
     }

     async verifyPassword(password: string  ): Promise<Boolean>  {
        return await bcrypt.compare(password, this.passwordHash)
     }

     get fullName(): string{
        return `${this.firstName} ${this.lastName}`
     }




}