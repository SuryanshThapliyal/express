import express from 'express';
import userRoutes from './modular routing/routes/users.routes.js';
import products from './modular routing/routes/products.routes.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTimer.js';
import {rateLimiter} from './middlewares/rateLimit.js';
const app = express();
const port = 8080;
app.use(express.json());

app.use(express.static('public'));
// app.use(rateLimiter)
app.use(logger);
app.use(requestTimer);
app.use('/users', rateLimiter,userRoutes);
app.use('/products', products );


app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})