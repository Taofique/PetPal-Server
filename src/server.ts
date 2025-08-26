import express from 'express';
import cors from 'cors';
import path from 'path';
import { sequelize } from './db';
import petsRouter from './routes/PetRoutes';
import usersRouter from './routes/UserRoutes';
import dotenv from 'dotenv';
import Pet from './models/Pet';
import seed from './seed/seed';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

//serve uploaded images
app.use('/uploads/pet_photos', express.static(path.join(process.cwd(), 'uploads', 'pet_photos')));

app.use('/api/pets', petsRouter);
app.use('/users', usersRouter);

sequelize.sync().then(async () => {
  console.log('Database synced!');

  const count = await Pet.count();
  if (count === 0) {
    console.log('No pets found, seeding data...!');
    await seed();
  }

  app.listen(process.env.PORT || 4000, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
});
