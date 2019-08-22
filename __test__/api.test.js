'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('Products API', () => {
  test('can create a project', () => {
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

  test('can update a project', () => {

    const testProduct = {
      name: 'Insomnia',
      description: 'An ok book',
      price: 10,
      category: 'books'
    };

    const testProductPut = {
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
          .send(testProductPut)
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.description).toEqual('A BAD book');
      });
  });
  test('can get a product', () => {

    const testProduct = {
      name: 'Insomnia',
      description: 'A BAD book',
      price: 10,
      category: 'books'
    };

    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(response => {
        return mockRequest.get(`/api/v1/products/${response.body._id}`)
          .then(savedProduct => {
            Object.keys(testProduct).forEach(key =>{
              expect(savedProduct.body[key]).toEqual(testProduct[key]);
            });
          });
      });
  });

  test('can delete a product', () => {

    const testProduct = {
      name: 'Insomnia',
      description: 'A BAD book',
      price: 10,
      category: 'books'
    };

    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(response => {
        return mockRequest.delete(`/api/v1/products/${response.body._id}`)
          .then(savedProduct => {
            expect(savedProduct.req.data).toEqual(undefined);
          });
      });
  });

});


describe('Categories API', () => {
  test('can create a category', () => {
    const testProduct = {
      name: 'Food',
      description: 'YUM',
    };

    return mockRequest.post('/api/v1/categories')
      .send(testProduct)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Food');
      });
  });

  test('can update a category', () => {

    const testProduct = {
      name: 'Food',
      description: 'YUM',
    };

    const testProductPut = {
      name: 'Food',
      description: 'YUM POST TEST',
    };


    return mockRequest.post('/api/v1/categories')
      .send(testProduct)
      .then(response => {
        return response.body._id})
      .then(id => {
        return mockRequest.put(`/api/v1/categories/${id}`)
          .send(testProductPut)
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.description).toEqual('YUM POST TEST');
      });
  });
  test('can get a category', () => {

    const testProduct = {
      name: 'Food',
      description: 'YUM',
    };


    return mockRequest.post('/api/v1/categories')
      .send(testProduct)
      .then(response => {
        return mockRequest.get(`/api/v1/categories/${response.body._id}`)
          .then(savedProduct => {
            Object.keys(testProduct).forEach(key =>{
              expect(savedProduct.body[key]).toEqual(testProduct[key]);
            });
          });
      });
  });

  test('can delete a category', () => {

    const testProduct = {
      name: 'Food',
      description: 'YUM',
    };


    return mockRequest.post('/api/v1/categories')
      .send(testProduct)
      .then(response => {
        return mockRequest.delete(`/api/v1/categories/${response.body._id}`)
          .then(savedProduct => {
            expect(savedProduct.req.data).toEqual(undefined);
          });
      });
  });

});


