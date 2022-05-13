//-----------------SOCKET-----------------//
const socket = io()

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

async function messagesHandler(messages){
    const templateResource = await fetch('js/templates/chat.hbs')
    const templateText = await templateResource.text()

    const templateHandlebar = Handlebars.compile(templateText)

    const html = templateHandlebar({ messages })

    document.getElementById('messages').innerHTML = html
}

const msgIn = document.getElementById('chat_inputs')

msgIn.addEventListener('submit', e =>{
    e.preventDefault();

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const message = {
        email: msgIn[0].value,
        date: dateTime,
        text: msgIn[1].value
    }
    socket.emit('newMessage', message)
    msgIn.reset();
})