import express from 'express'
import carsRouter from './cars-router.js'

// Cria uma insttancia do Router
const router = express.Router();

// Define o prefixo /cars para. as rotas contidas no carsRouters
router.use('/cars', carsRouter)


// Exporta o router com todas as rotas 
export default router;

