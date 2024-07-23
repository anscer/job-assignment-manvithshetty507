import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import State from '../models/state'; 
import stateRouter from '../src/routes/stateRouter'; 

const app = express();
app.use(express.json());
app.use('/api/states', stateRouter);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await State.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('State API', () => {
  test('should create a new state', async () => {
    const response = await request(app)
      .post('/api/states')
      .send({
        name: 'Test State',
        description: 'A state for testing',
        status: 'active',
        createdBy: 'user1',
      })
      .expect(201);

    expect(response.body).toHaveProperty('name', 'Test State');
  });

  test('should get a state by ID', async () => {
    const state = new State({
      name: 'Another State',
      description: 'Another state for testing',
      status: 'inactive',
      createdBy: 'user2',
    });
    await state.save();

    const response = await request(app)
      .get(`/api/states/${state._id}`)
      .expect(200);

    expect(response.body).toHaveProperty('name', 'Another State');
  });

  test('should update a state by ID', async () => {
    const state = new State({
      name: 'State to Update',
      description: 'State before update',
      status: 'inactive',
      createdBy: 'user3',
    });
    await state.save();

    const response = await request(app)
      .put(`/api/states/${state._id}`)
      .send({ status: 'active' })
      .expect(200);

    expect(response.body).toHaveProperty('status', 'active');
  });

  test('should delete a state by ID', async () => {
    const state = new State({
      name: 'State to Delete',
      description: 'State before delete',
      status: 'inactive',
      createdBy: 'user4',
    });
    await state.save();

    await request(app)
      .delete(`/api/states/${state._id}`)
      .expect(200);

    await request(app)
      .get(`/api/states/${state._id}`)
      .expect(404);
  });
});
