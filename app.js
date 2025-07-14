import express from 'express';
import userRoutes from './modular routing/routes/users.routes.js';
import products from './modular routing/routes/products.routes.js';
const app = express();
const port = 8080;
app.use(express.json());


app.use('/users', userRoutes);
app.use('/products', products );

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})