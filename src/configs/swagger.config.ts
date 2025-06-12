import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Name",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"], // Adjust path as needed
};

export const swaggerSpec = swaggerJSDoc(options);
