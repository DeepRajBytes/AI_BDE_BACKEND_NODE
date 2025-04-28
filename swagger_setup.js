const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

/**
 * Sets up Swagger UI for the Express app
 * @param {import('express').Express} app
 */
const setupSwagger = (app) => {
  const swaggerPath = path.join(__dirname, "src", "api_docs", "swagger.json");
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = { setupSwagger };
