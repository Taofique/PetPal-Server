import fetch from 'node-fetch';
import Pet from '../models/Pet';

import { CatApiItems, DogApiResponse } from '../types/resPetApi';

async function seedFromPublicAPI() {
  try {
    const dogRes = await fetch('https://dog.ceo/api/breeds/image/random/5');
    const dogData = (await dogRes.json()) as DogApiResponse;

    const catRes = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
    const catData = (await catRes.json()) as CatApiItems[];

    const pets = [
      ...dogData.message.map((img: string, i: number) => ({
        ownerId: 1,
        nickname: `Doggo${i + 1}`,
        species: 'Dog',
        nextFeed: new Date(),
        nextVet: new Date(),
        photo: img
      })),
      ...catData.map((c: any, i: number) => ({
        ownerId: 1,
        nickname: `Kitty${i + 1}`,
        species: 'Cat',
        nextFeed: new Date(),
        nextVet: new Date(),
        photo: c.url
      }))
    ];

    await Pet.bulkCreate(pets);
    console.log('✅ Seeded pets from Dog + Cat APIs!');
  } catch (err) {
    console.error('❌ Error seeding pets:', err);
  }
}

export default seedFromPublicAPI;
