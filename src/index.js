import express from 'express';
import { promises as fs } from 'fs';
import routes from './routes/index.router.js'

// Desestrutura as funções readFile e writeFile
const { readFile, writeFile } = fs;

// Define a variavel carList como global
global.carList = "car-list.json";


// Inicia uma instancia do express
const app = express();

// Define o uso do formato Json pelo express
app.use(express.json());


// Routers
app.use(routes);


// Define a porta que o express usará e uma callback que formata o arquivo car-list.json
app.listen(3000, async () => {
    try {
        console.log("Api Online");
        let cars = await readFile(carList);
        cars = JSON.parse(cars);
        await writeFile(carList, JSON.stringify(cars, null, 2));
    } catch (error) {
        console.log(error)
    }
});