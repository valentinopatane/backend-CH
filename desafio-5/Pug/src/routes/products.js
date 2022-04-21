//-----------------------REQUIRE & IMPORTS-----------------------//
const {Router} = require('express');
const Cont = require('../handlers/productClass')
const routerProducts = new Router()
const data = new Cont('products')

//-----------------------FORM-----------------------//

routerProducts.get('/', (req, res) => {
    res.render('form')
})

routerProducts.post('/productos', async (req, res) => {
    try {
        const arrayProducts = await data.getAll()
        const noImage = 'https://i.ibb.co/0Jmshvb/no-image.png'
        let lastID = 0
  
        if (arrayProducts.length) {
        lastID = arrayProducts[arrayProducts.length - 1].id
        }
  
        const newProduct = {
            id: lastID + 1,
            title: req.body.title ? req.body.title : 'No Title',
            price: req.body.price ? req.body.price : 0,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : noImage,
        }
        await data.add(newProduct)
        res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  })
  
//-----------------------PRODUCT GETTER-----------------------//
routerProducts.get('/productos', async (req, res) => {
    try {
      const arrayProducts = await data.getAll()
      res.render('products', { arrayProducts })
    } catch (error) {
      console.log(error)
    }
})



module.exports = routerProducts