import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import '@testing-library/jest-dom';

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
