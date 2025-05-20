import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, MinLength, ValidateIf } from "class-validator";




export class CreateCategoryDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name!:string


    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    description!:string




    @IsOptional()
    @IsNumber()
    displayOrder?:number
  

}

export class UpdateCategoryDto {
    
   
   


    @IsOptional()
    @IsString()
    @MinLength(2)
    name?:string


    @IsOptional()
    @IsString()
    @MinLength(2)
    description?:string




    @IsOptional()
    @IsNumber()
    displayOrder?:number
  

}


export class CreateMenuItemDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name!:string


    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    description!:string


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsNotEmpty()
    preparationTime!:number

    @IsOptional() 
    @IsBoolean()
    isAvalable!:boolean
   

    @IsNotEmpty()
    @IsString()
    category_id!: string;

}


export class UpdateMenuItemDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name!:string


    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    description!:string


    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    preparationTime?:number

    @IsOptional() 
    @IsBoolean()
    isAvalable!:boolean
   

    @IsNotEmpty()
    @IsString()
    category_id!: string;
  

}