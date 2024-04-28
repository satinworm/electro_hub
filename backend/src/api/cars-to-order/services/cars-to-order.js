'use strict';

/**
 * cars-to-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cars-to-order.cars-to-order');
