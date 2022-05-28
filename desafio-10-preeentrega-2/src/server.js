import express from 'express'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/productos', productRouter)
app.use('/carritos', cartRouter)


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, ()=>{
    console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', error => console.log(`Server error: ${error}`))