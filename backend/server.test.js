const request = require('supertest');
const app = require('./app'); 

describe('API Endpoints', () => {
  test('GET /api/countries should return a list of countries', async () => {
    const response = await request(app).get('/api/countries');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/countries should add a country', async () => {
    const newCountry = {
      name: 'France',
      capital: 'Paris',
      population: 67000000,
      currency: 'EUR'
    };

    const response = await request(app)
      .post('/api/countries')
      .send(newCountry);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('France');
  });
});
