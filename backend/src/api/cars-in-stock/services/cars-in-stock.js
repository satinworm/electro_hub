'use strict';

/**
 * cars-in-stock service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cars-in-stock.cars-in-stock');
