'use strict';

const Model = require('../mongo.js');
const schema = require('./categories-schema');

/**
 * Class representing a Product.
 * @extends Model
 */
class Categories extends Model {
  constructor() { super(schema); }
}

module.exports = Categories;