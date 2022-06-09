//-----------------SOCKET-----------------//
const socket = io()


//-----------------LOG IN-----------------//

const logIn = document.getElementById('logIn')
logIn.addEventListener('submit', (e)=>{
    e.preventDefault();
    let user = logIn[0].value
    socket.emit('logIn', user )
})


socket.on('logged', async (user)=>{

    const templateResource = await fetch('js/templates/welcome.hbs')
    const templateText = await templateResource.text()
    const templateHandlebar = Handlebars.compile(templateText)

    console.log(user + ' front')

    fetch('/login')
    .then(()=>{
        const html = templateHandlebar({user})
        document.getElementById('welcome').innerHTML = html
    })
    .catch(error=>console.log(error))

//-----------------LOG OUT-----------------//
    const logout = document.getElementById('logout')
    logout.addEventListener('click', (e)=>{
        e.preventDefault()
        fetch('/logout')
        .then(()=>{
            document.getElementById('welcome').innerHTML = '<h2>Session Closed</h2>'
        })
        .catch((error)=>console.log(error))
    })

    // window.location.replace('/con-session')
})






//-----------------PRODUCTS-----------------//
socket.on('showProducts', productHandler);

async function productHandler(products){
    const templateResource = await fetch('js/templates/product-table.hbs')
    const templateText = await templateResource.text()

    const templateHandlebar = Handlebars.compile(templateText)

    const html = templateHandlebar({ products })

    document.getElementById('productList').innerHTML = html
}

const form = document.getElementById('form')

form.addEventListener('submit',  e =>{
    e.preventDefault();

    const product = {
        id:0,
        name: form[0].value,
        price: Number(form[1].value),
        thumbnail: form[2].value
    }
    socket.emit('newProduct', product)
    form.reset();
})
//-----------------MESSAGES-----------------//
socket.on('showMessages', messagesHandler)

async function messagesHandler(newArrayMessages){
    const templateResource = await fetch('js/templates/chat.hbs')
    const templateText = await templateResource.text()

    const templateHandlebar = Handlebars.compile(templateText)

    const authorSchema = new normalizr.schema.Entity('authors')

    const messageSchema = new normalizr.schema.Entity('messages', {
        author: authorSchema,
    }, {idAttribute:'_id'})

    // const chatSchema = new schema.Entity('chats', {
    //     messages: [messageSchema]
    // })    

    const denormalizedMessages = normalizr.denormalize( newArrayMessages.result, [messageSchema] , newArrayMessages.entities )
    // const { messages: denormalizedMessages } = normalizr.denormalize( newArrayMessages.result, chatSchema , newArrayMessages.entities )

    console.log(JSON.stringify(newArrayMessages).length)
    console.log('--------------------')
    console.log(JSON.stringify(denormalizedMessages).length)

    console.log(denormalizedMessages)

    const html = templateHandlebar({ denormalizedMessages })

    document.getElementById('messages').innerHTML = html
}

const msgIn = document.getElementById('chat_inputs')



msgIn.addEventListener('submit', e =>{
    e.preventDefault();

    const message = {
        author: {
            id:msgIn[5].value,
            name: msgIn[0].value,
            lastname: msgIn[1].value,
            age: msgIn[2].value,
            alias:msgIn[3].value,
            avatar: msgIn[4].value
        },
        text: msgIn[6].value
    }

    socket.emit('newMessage', message)
    msgIn.reset();
})