const fs = require('fs');


class Cont{
    constructor(fileName){
        this.fileName = fileName;
    }
    async addProductToCart(id, object){
        try{
            const arrayCarts = JSON.parse(
                await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
            )
            const cartFound = arrayCarts.find((cart) => cart.id === Number(id))

            const {content} = cartFound

            let lastProductFromCartID = 0
            
            if (content.length) {
              lastProductFromCartID = content[content.length -1].inCartID;
              object.inCartID = lastProductFromCartID + 1;
            }else{
              object.inCartID = 1
              lastProductFromCartID++
            }
              
            content.push(object)
          
            const index = Number(cartFound.id) - 1;

            arrayCarts[index] = cartFound;

            await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify(arrayCarts) ,'utf-8')

        }catch (error) {
            console.log(error)
        }
    }
    async getAllProductsInCart(id) {
        try {
          const arrayCarts = JSON.parse(
            await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
          )
          const cartFound = arrayCarts.find((cart) => cart.id === Number(id))

          const {content} = cartFound
          
          return content

        } catch (error) {
          console.log(error)
        }
    }

    async deleteProductFromCart(idCart, id) {
        try {
          let arrayCarts = JSON.parse(
            await fs.promises.readFile(`src/data/${this.fileName}.json`, 'utf-8')
          )
          let cartFound = arrayCarts.find((cart) => cart.id === Number(idCart))
          
          let {content} = cartFound

          const filteredArrayProducts = content.filter((product) => product.inCartID !== Number(id))

          cartFound.content = filteredArrayProducts

          const index = Number(cartFound.id - 1)
    
          if (JSON.stringify(content) === JSON.stringify(filteredArrayProducts)) {
            return false
          } else {

            arrayCarts[index] = cartFound
            await fs.promises.writeFile(`src/data/${this.fileName}.json`, JSON.stringify(arrayCarts) ,'utf-8')
            return true
          }
        } catch (error) {
          console.log(error)
        }
      }

}
module.exports = Cont