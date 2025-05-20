import { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import CategoryService from "../services/categoryService";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";

export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}


    create =  async (req:Request, res:Response): Promise<void> => {
      // const categoryService: CategoryService =  (req as any).resolve("categoryService");

    try {
        const body:CreateCategoryDto = plainToInstance(CreateCategoryDto,req.body);
   
        const category =  await this.categoryService.create(body);
   
         res.status(201).json({
            data : category
         });
    } catch (error) {
        throw error;
    }
 
  }
  
    update =  async (req:Request, res:Response): Promise<void> => {
      // const categoryService: CategoryService =  (req as any).resolve("categoryService");

    try {
        const body:UpdateCategoryDto = plainToInstance(UpdateCategoryDto,req.body);
   
        const category =  await this.categoryService.update( req.params.id ,body, );
   
         res.status(200).json({
            data : category
         });
    } catch (error) {
        throw error;
    }
 
  }

    getAll =  async (req:Request, res:Response): Promise<void> => {
      // const categoryService: CategoryService =  (req as any).resolve("categoryService");

    try {
      
   
        const categories =  await this.categoryService.getAllCategories();
   
         res.status(200).json({
            data : categories
         });
    } catch (error) {
        throw error;
    }
 
  }

      


}