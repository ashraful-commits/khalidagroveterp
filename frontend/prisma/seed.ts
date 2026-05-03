import { PrismaClient } from '@prisma/client';
// Ensure types are picked up
import type * as _PrismaClient from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data in correct order
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.warehouse.deleteMany({});

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 2. Create Users (Website Roles)
  const users = [
    { name: 'Super Admin', email: 'admin@agrovet.com', role: 'SUPER_ADMIN' },
    { name: 'Factory Manager', email: 'factory@agrovet.com', role: 'FACTORY_MANAGER' },
    { name: 'Warehouse Manager', email: 'warehouse@agrovet.com', role: 'WAREHOUSE_MANAGER' },
    { name: 'HR Manager', email: 'hr@agrovet.com', role: 'HR_ACCOUNTS' },
    { name: 'Regional Manager', email: 'rsm@agrovet.com', role: 'RSM' },
  ];

  for (const u of users) {
    await prisma.user.create({
      data: {
        ...u,
        password: hashedPassword,
      } as any,
    });
  }

  // 3. Create Departments
  const departments = ['Manufacturing', 'Sales', 'HR', 'Accounting', 'Logistics'];
  for (const d of departments) {
    await prisma.department.create({ data: { name: d } });
  }

  // 4. Create Categories & Products
  const category = await prisma.category.create({ data: { name: 'Raw Materials' } });
  await prisma.product.create({
    data: {
      name: 'Ammonia Solution',
      sku: 'RAW-001',
      categoryId: category.id,
      reorderLevel: 100,
      price: 550,
    } as any,
  });

  // 5. Create Warehouses
  const warehouses = ['Central Factory Warehouse', 'Dhaka Distribution Center'];
  for (const w of warehouses) {
    await prisma.warehouse.create({ data: { name: w } });
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
