import { products } from '../class/productClass.js';


export async function productSocket(socket){
    const productListed = await products.getAll();
 
    socket.emit('showProducts', productListed)
  
    socket.on('newProduct', product =>{
        products.add(product)
        socket.emit('showProducts', productListed)
    })
}