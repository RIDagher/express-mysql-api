import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import tutorialRoutes from './app/routes/tutorial.routes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Use tutorial routes
app.use('/api', tutorialRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
