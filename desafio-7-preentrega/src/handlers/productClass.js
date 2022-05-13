const fs = require('fs');

class Cont{
    constructor(fileName){
        this.fileName = fileName;
    }
    async add(object){
        try{
            const arrayProducts = JSON.parse(
                await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
            )
            let lastID = 0;

            if (arrayProducts.length) {
              lastID = arrayProducts[arrayProducts.length - 1].id;
              object.id = lastID + 1;
            }

            arrayProducts.push(object)
            await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify(arrayProducts) ,'utf-8')
        }catch (error) {

          const newEmptyArray = []

          object.id = 1;

          newEmptyArray.push(object)
          await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify(newEmptyArray), 'utf-8')
        }
       
    }
    async getById(id) {
        try {
          const arrayProducts = JSON.parse(
            await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
          )
    
          const productFound = arrayProducts.find((item) => item.id === Number(id))
    
          return productFound
        } catch (error) {
          console.log(error)
        }
      }
    async getAll() {
        try {
          const arrayProducts = JSON.parse(
            await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
          )
          return arrayProducts

        } catch (error) {
          await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify([]), 'utf-8')
    
          const newEmptyArray = JSON.parse(
            await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
          )
          return newEmptyArray
        }
    }
    async edit(id, object){
      try{
        let arrayProducts = JSON.parse(await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8'));

        const productFound = arrayProducts.find((item) => item.id === Number(id));

        object.id = productFound.id;

        const index = Number(productFound.id) - 1;

        arrayProducts[index] = object;

        await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify(arrayProducts) ,'utf-8')
    }catch(error){
        console.log(error)
    }
    }
    async deleteById(id) {
        try {
          const arrayProducts = JSON.parse(
            await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
          )
    
          const filteredArrayProducts = arrayProducts.filter((product) => product.id !== Number(id))
    
          if (JSON.stringify(arrayProducts) === JSON.stringify(filteredArrayProducts)) {
            return false
          } else {
            await fs.promises.writeFile(
              `src/data/${this.fileName}.json`,
              JSON.stringify(filteredArrayProducts),
              'utf-8'
            )
            return true
          }
        } catch (error) {
          console.log(error)
        }
      }
    async deleteAll(){
        try {
            const arrayProducts = JSON.parse(
                await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
            );
            
            const clearArray = arrayProducts.splice(0,arrayProducts.length);

            if (JSON.stringify(arrayProducts) === JSON.stringify(clearArray)) {
                return false
              } else {
                await fs.promises.writeFile(
                  `src/data/${this.fileName}.json`,
                  JSON.stringify(clearArray),
                  'utf-8'
                )
                return true
              }

        }catch (error) {
            console.log(error)
        }
    }
}
module.exports = Cont