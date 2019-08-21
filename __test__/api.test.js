'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('Products API', () => {
  test('Creating a new product should return 201 and the created object', () => {
    const testProduct = {
      name: 'Insomnia',
      description: 'An OK book',
      price: 10,
      category: 'books'
    };

    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Insomnia');
      });
  });

  test('Creating a new product should return 201 and the created object', () => {

    const testProduct = {
      name: 'Insomnia',
      description: 'A BAD book',
      price: 10,
      category: 'books'
    };

    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(response => {
        return response.body._id})
      .then(id => {
        return mockRequest.put(`/api/v1/products/${id}`)
          .send(testProduct)
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.description).toEqual('A BAD book');
      });
  });
});


