"use strict";

/**
 * `constructor-populate` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In constructor-populate middleware.");
    w;
    await next();
  };
};
