// Call in installed dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import DB_CONFIG from './config/db.config.js';
import appConfig from './config/app.config.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import countryRoutes from './routes/country.routes.js';
import cityRoutes from './routes/city.routes.js';
import propertyRoutes from './routes/property.routes.js';
import propertyTypeRoutes from './routes/propertyType.routes.js';
import roomTypeRoutes from './routes/roomType.routes.js';
import bedRoutes from './routes/bed.routes.js';
import breakfastRoutes from './routes/breakfast.routes.js';
import roomNameRoutes from './routes/roomName.routes.js';
import amenityCategoryRoutes from './routes/amenityCategory.routes.js';
import amenityRoutes from './routes/amenity.routes.js';

// set up express app
const app = express();

//const swaggerDocument = YAML.load('./swagger.yaml');
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`${DB_CONFIG.HOST}:${DB_CONFIG.PORT}/${DB_CONFIG.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database', error);
    });

// set up home route
app.get('/', (request, respond) => {
    respond.status(200).json({
        message: 'Welcome to Project Support',
    });
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(appConfig.PORT, (request, respond) => {
    console.log(`Our server is live on ${appConfig.PORT}. Yay!`);
});

// set up route
app.use('/api/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/country/', countryRoutes);
app.use('/api/city/', cityRoutes);
app.use('/api/property/', propertyRoutes);
app.use('/api/propertyType/', propertyTypeRoutes);
app.use('/api/roomType/', roomTypeRoutes);
app.use('/api/bed/', bedRoutes);
app.use('/api/breakfast/', breakfastRoutes);
app.use('/api/roomName/', roomNameRoutes);
app.use('/api/amenityCategory/', amenityCategoryRoutes);
app.use('/api/amenity/', amenityRoutes);