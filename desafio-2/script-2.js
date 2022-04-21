const fs = require('fs')

class Product {
    constructor(title,price,thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = null;
    }
}
const object1 = new Product('Escuadra', 20 ,'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
const object2 = new Product('Calculadora', 30 ,'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png');
const object3 = new Product('Globo Terráqueo', 30 ,'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png');

////

let lastID = 0;

class Contenedor{
    constructor(){
        this.objectList = []
    }
    async save(object){
        object.id = lastID + 1;
        this.objectList.push(object)
        lastID++;
        console.log(object.id)

        await fs.promises.writeFile('productos.txt', JSON.stringify(this.objectList))
        
    }
    getById(number){
        fs.promises.readFile('productos.txt','utf-8')
        .then((data)=> JSON.parse([data]))
        .then((array)=> array.find(object => object.id === number))
        .then((object)=> object === undefined ? null : console.log(object))
        .catch(()=> console.log('Error: Archivo vacío'))
    }
    getAll(){
        fs.promises.readFile('productos.txt','utf-8')
        .then((data)=> JSON.parse([data]))
        .then((array)=> console.log(array))
        .catch(()=> console.log('Error: Archivo vacío'))
    }
    async deletebyId(number){
        
        let match = this.objectList.find(object => object.id === number)
        

        match === undefined ? (null) 
        : (
            this.objectList.splice(match.id-1,1),
            fs.promises.writeFile('productos.txt',' '.repeat(1_000_000)),
            await fs.promises.writeFile('productos.txt', JSON.stringify(this.objectList))
        );
    }
    async deleteAll(){
        this.objectList = [];
        await fs.promises.writeFile('productos.txt',' '.repeat(1_000_000)),
        console.log(this.objectList);
    }
}

const contenedor = new Contenedor();

contenedor.save(object1);
contenedor.save(object2);
contenedor.save(object3);

// contenedor.getById(1);
// contenedor.getAll();
// contenedor.deletebyId(2);
// contenedor.deleteAll();
