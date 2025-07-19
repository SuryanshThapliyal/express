// /app.js
import express from 'express';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(express.json());

// mount route
app.use('/api/users', userRoutes);

// error handler (basic)
app.use((err, req, res, next) => {
res.status(res.statusCode || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '👀' : err.stack,
});
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
