import Pet from '../models/Pet';

async function seed() {
  try {
    await Pet.bulkCreate([
      {
        ownerId: 1,
        nickname: 'Buddy',
        species: 'Dog',
        nextFeed: new Date(),
        nextVet: new Date(),
        photo: null // ✅ no photo → frontend uses placeholder
      },
      {
        ownerId: 1,
        nickname: 'Mittens',
        species: 'Cat',
        nextFeed: new Date(),
        nextVet: new Date(),
        photo: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg' // ✅ external API URL
      },
      {
        ownerId: 2,
        nickname: 'Charlie',
        species: 'Dog',
        nextFeed: new Date(),
        nextVet: new Date(),
        photo: 'uploads/pet_photos/default-dog.png' // ✅ local uploaded path
      }
    ]);
    console.log('✅ Seeded pets with mixed photo sources!');
  } catch (err) {
    console.error('❌ Error seeding pets:', err);
  }
}

export default seed;
