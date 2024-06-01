const swaggerAutogen = require('swagger-autogen')()

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'My Restaurants Reviewer API',
    description: 'API for managing restaurants and menus',
    version: '1.0.0',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    'contact': {
      'name': 'Alvison Hunter/ CodeCrafters Labs',
      url: 'https://codecrafterslabs.com/',
      'email': 'alvison@gmail.com'
    }
  },
  host: 'https://xilotepeando.vercel.app/',
  basePath: '/api/restaurants',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./src/routes/restaurant.route.ts'];

swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition);