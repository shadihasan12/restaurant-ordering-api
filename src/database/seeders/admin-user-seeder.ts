import { User, UserRole } from "@modules/auth/entities/user";
import { EntityManager } from "typeorm";
import bcrypt from "bcrypt";



export async function seedAdminUser(entityManager:EntityManager){


    const existingAdmin = await entityManager.findOne(User, {
        where : [
           { email: process.env.ADMIN_EMAIL || 'admin@restaurant.com'}
        ]
    } );

    if (existingAdmin) {
        console.log('Admin user already exists, skipping seed');
        return;
      }

      // Create admin user
  const adminUser = new User();
  adminUser.firstName = 'Admin';
  adminUser.lastName = 'User';
  adminUser.email = process.env.ADMIN_EMAIL || 'admin@restaurant.com';
  adminUser.phone = process.env.ADMIN_PHONE || '+1234567890';

  // Hash password directly (since we're not using the User.password setter here) 

//   const salt = await bcrypt.genSalt(10);
//   adminUser.passwordHash = await bcrypt.hash(
    adminUser.password =  process.env.ADMIN_PASSWORD || 'Admin123!', 
//     salt
//   );

  adminUser.role = UserRole.ADMIN;

  await entityManager.save(User, adminUser);


    
}