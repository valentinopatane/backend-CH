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
            arrayProducts.push(object)
            await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify(arrayProducts) ,'utf-8')
        }catch(error){
            console.log(error)
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