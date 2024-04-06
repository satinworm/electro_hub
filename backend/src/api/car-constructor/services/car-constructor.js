'use strict';

/**
 * car-constructor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::car-constructor.car-constructor');
