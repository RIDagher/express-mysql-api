import express from 'express';
import { createTutorial } from '../controllers/tutorial.controllers.js';

const router = express.Router();

// Route for creating a new tutorial
router.post('/tutorials', createTutorial);

export default router;
