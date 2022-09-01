import { promises as fs } from 'fs';
const { readFile } = fs;

class CarsService {

    // Metodo de listagem da/s marca/s com mais modelos de carros
    async moreCars(req, res) {
        // Atruibuindo o conteudo do aquivo carList em Json a variavel cars
        let cars = await getCarList();

        // Ordenando as marcas pelo numero de modelos, ordem Decrescente
        cars.sort(function (a, b) {
            return b.models.length < a.models.length ? -1 : b.models.length > a.models.length ? 1 : 0;
        });

        // Variavel responsavel para validar a marca com mais modelos
        let moreCars = cars[0].models.length;

        // Mapeando a/as marcas com mais modelos, em caso de empate.
        cars = cars.map(car => {
            if (car.models.length >= moreCars) {
                moreCars = car.models.length
                return car.brand
            }
        });

        // Filtrando somente por dados existente, removendo os undefined.
        cars = cars.filter(Boolean)

        // Retornando a/as marcas que possuem mais modelos.
        res.send(cars)
    }

    // Metodo de listagem da/s  X marca/s com mais modelos de carros
    async moreCarsForQuantity(req, res) {
        // Atruibuindo o conteudo do aquivo carList a variavel cars
        let cars = await getCarList();

        // Ordenando as marcas pelo numero de modelos, ordem Crescente
        cars.sort(function (a, b) {
            return b.models.length < a.models.length ? -1 : b.models.length > a.models.length ? 1 : 0;
        });

        // Obtendo as marcas já filtradas.
        cars = await getCarsFiltered(cars, req.params.quantity)

        // Retornando a/as marcas que possuem mais modelos.
        res.send(cars)
    }

    // Metodo de listagem da/s marca/s com menos modelos de carros
    async lessCars(_req, res) {
        // Atruibuindo o conteudo do aquivo carList em Json a variavel cars
        let cars = await getCarList();

        // Ordenando as marcas pelo numero de modelos, ordem Crescente
        cars.sort(function (a, b) {
            return a.models.length < b.models.length ? -1 : a.models.length > b.models.length ? 1 : 0;
        });

        // Variavel responsavel para validar a marca com menos modelos
        let lowerCars = cars[0].models.length;

        // Mapeando a/as marcas com menos modelos, em caso de empate.
        cars = cars.map(car => {
            if (car.models.length <= lowerCars) {
                lowerCars = car.models.length
                return car.brand
            }
        })

        // Filtrando somente por dados existente, removendo os undefined.
        cars = cars.filter(Boolean);

        // Retornando a/as marcas que possuem menos modelos.
        res.send(cars)

    }

    // Metodo de listagem da/s  X marca/s com menos modelos de carros
    async lessCarsForQuantity(req, res) {
        // Atruibuindo o conteudo do aquivo carList em Json a variavel cars
        let cars = await getCarList();

        // Ordenando as marcas pelo numero de modelos, ordem Decrescente
        cars.sort(function (a, b) {
            return a.models.length < b.models.length ? -1 : a.models.length > b.models.length ? 1 : 0;
        });

        // Obtendo as marcas já filtradas.
        cars = await getCarsFiltered(cars, req.params.quantity);

        // Retornando a/as marcas que possuem mais modelos.
        res.send(cars)
    }

    // Metodo de listagem pelo marca do carro.
    async listModels(req, res) {
        // Atribuindo a variavel car_brand(Marca do Carro),  vindo pelo body da requisição e 
        // Transformando em minusculo. Ex: HoNdA -> honda
        let brand = req.body.car_brand.toLowerCase();

        // Transoformando a primeira letra da string em maisculo, e depois concatenando com o resto da string
        // Ex: honda = H + onda => Honda
        brand = brand[0].toUpperCase() + brand.substring(1);

        // Atruibuindo o conteudo do aquivo carList em Json a variavel cars
        let cars = await getCarList();

        // Filtrando todos os carros pela marca enviada.
        cars = cars.filter(car => car.brand === brand)

        // Retornando a lista de modelos
        res.send(cars[0].models)
    };
}

// Função que obter a lista de marcas do aquivo car-list.json e retorna um JSON
export async function getCarList() {
    // Atruibuindo o conteudo do aquivo carList a variavel cars
    let cars = await readFile(global.carList);

    // Utilizando JSON.parse para transformar em JSON o conteudo de cars
    cars = JSON.parse(cars);

    // Retornando a lista de carros em JSON.
    return cars;
}

// Função que filtra as marcas pela quantidade
export async function getCarsFiltered(cars, quantity) {
    // Como o Array começa em 0, atribuo a quantidade recebida pela requisição -1
    quantity -= 1;

    // Mapeando a/as marcas com mais modelos
    cars = cars.map((car, index) => {
        if (index <= quantity)
            return `${car.brand} - ${car.models.length}`
    });

    // Filtrando somente por dados existente, removendo os undefined.
    cars = cars.filter(Boolean);

    // Retornando as marcas.
    return cars;
}

export default new CarsService();