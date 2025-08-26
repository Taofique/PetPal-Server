import express from 'express';
import cors from 'cors';
import path from 'path';
import { sequelize } from './db';
import petsRouter from './routes/PetRoutes';
import usersRouter from './routes/UserRoutes';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json('API Working!');
});

//serve uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads', 'pet_photos')));

app.use('/api/pets', petsRouter);
app.use('/users', usersRouter);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 4000, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
});
