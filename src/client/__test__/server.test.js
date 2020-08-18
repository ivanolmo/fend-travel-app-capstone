const request = require('supertest');
const app = require('../../server/index.js');
import '@babel/polyfill';

describe('Test POST endpoint', () => {
  it('should create a new post', async () => {
    const res = await request('http://localhost:9000')
      .post('/api/post')
      .send({
        name: 'test name',
        temp: '98.6',
        image: 'image.webp'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body[0].name).toEqual('test name');
    expect(res.body[0].temp).toEqual('98.6');
    expect(res.body[0].image).toEqual('image.webp');
  })
});