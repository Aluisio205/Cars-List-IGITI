import express from "express";
import carsService from "../services/cars.service.js";
const router = express.Router();

// Rota das marcas com mais carros
router.get('/moreCars', carsService.moreCars);

// Rota das X marcas com mais carros
router.get('/moreCars/:quantity', carsService.moreCarsForQuantity);

// Rota das marcas com menos carros
router.get('/lessCars', carsService.lessCars);

// Rota das X marcas com menos carros
router.get('/lessCars/:quantity', carsService.lessCarsForQuantity);

// Rota da marca X, recebida no parametro
router.post('/listModels', carsService.listModels)

// Exporta o Router com todas as rotas dos cars
export default router;