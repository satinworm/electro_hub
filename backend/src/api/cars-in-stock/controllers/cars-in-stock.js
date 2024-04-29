'use strict';

/**
 * cars-in-stock controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cars-in-stock.cars-in-stock');
