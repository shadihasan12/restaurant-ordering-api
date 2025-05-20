import { EntityManager } from "typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { Category } from "../entities/category";
import { createAppError } from "@common/middlewares/error_handler";
import { plainToInstance } from "class-transformer";

export default class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * Creates a new category
   * @param data The category data to create
   * @returns The newly created category
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    // Get a typed repository for better method access and type safety
    const repo = this.entityManager.getRepository(Category);
    
    // Check if category with the same name already exists
    const existingCategory = await repo.findOne({
      where: { name: data.name }
    });
    
    if (existingCategory) {
      throw createAppError("Category with this name already exists", 400);
    }
    
    // Create a new category entity with explicit property assignment
    // This is clearer than Object.assign for new entity creation
    const newCategory = new Category();
    newCategory.name = data.name;
    newCategory.description = data.description;
    
    // Only set displayOrder if provided
    if (data.displayOrder !== undefined) {
      newCategory.displayOrder = data.displayOrder;
    }
    
    // Save the new category
    const savedCategory = await repo.save(newCategory);
    
    // Transform and return the entity
    return plainToInstance(Category, savedCategory);
  }

  /**
   * Updates an existing category
   * @param id The ID of the category to update
   * @param data The category data to update
   * @returns The updated category
   */
  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    // Get a typed repository for better method access
    const repo = this.entityManager.getRepository(Category);
    
    // Find the category or throw an error if not found
    // This will throw TypeORM's EntityNotFoundError if category doesn't exist
    const category = await repo.findOneByOrFail({ id });
    
    // If name is changing, verify it won't cause a duplicate
    if (data.name && data.name !== category.name) {
      const nameExists = await repo.findOne({ 
        where: { name: data.name } 
      });
      
      if (nameExists) {
        throw createAppError("Category with this name already exists", 400);
      }
    }
    
    // Update the entity using Object.assign
    // This is concise for partial updates and only changes provided fields
    Object.assign(category, data);
    
    // Save the updated category
    const updatedCategory = await repo.save(category);
    
    // Transform and return the entity for consistency
    return plainToInstance(Category, updatedCategory);
  }

  async getAllCategories() : Promise<Category[]>{
    const categories = await this.entityManager.find(Category, {
        order: { created_at: "DESC" }
      });
      return plainToInstance(Category, categories);
  }

  

  
}