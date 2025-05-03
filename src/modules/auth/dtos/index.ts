import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";


export class RegisterDto{

   @IsNotEmpty()
   @IsString()
   firstName!:string

   @IsNotEmpty()
   @IsString()
   lastName!: string

   @IsNotEmpty()
   @IsEmail()
   email!:string

   @IsNotEmpty()
   @IsString()
   @Matches(/^\+?[0-9]{10,15}$/, { message: "Phone number must be valid" })
   phone!:string;


   @IsNotEmpty()
   @IsString()
   @MinLength(8)
   password!:string;


}




export class LoginDto {

  
 
    @IsNotEmpty()
    @IsEmail()
    email!:string
 
  
 
 
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!:string;
 
 
 }


 export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^\+?[0-9]{10,15}$/, { message: "Phone number must be valid" })
    phone?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;
  }