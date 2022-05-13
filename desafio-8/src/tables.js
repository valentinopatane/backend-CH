import knex from 'knex'

import template from './data/template.js'

//----------------Products Table----------------//
import configMySql from './config/configMySql.js'
const mySqlClient = knex(configMySql)

//----------------Messages Table----------------//
import configSqlite from './config/configSqlLite.js'
const sqLiteClient = knex(configSqlite)


//----------------Products Table----------------//

mySqlClient.schema.hasTable('products')

.then((exists) => {
        if (!exists) {
            mySqlClient.schema.createTable('products', (table) => {
                table.increments('id'),
                table.string('name'),
                table.string('description'),
                table.float('price'),
                table.integer('stock'),
                table.string('thumbnail')
              }).then(()=>{
                template.forEach(product =>{
                    return mySqlClient('products').insert(product) 
                }) 
              }).then(()=>{
                console.log('"Products" Table created!')
              })
              

            }else{
                console.log('Products table already exists')
            }
        })

.finally(() => {
    mySqlClient.destroy()
})

//----------------Messages Table----------------//

sqLiteClient.schema.hasTable('messages')
.then((exists)=>{
    if(!exists){
        sqLiteClient.schema.createTable('messages',(table)=>{
            table.string('email').useNullAsDefault,
            table.string('date').useNullAsDefault,
            table.string('text').useNullAsDefault
        }).then(()=>{
            console.log('"Messages" Table created!')
          })
    } else{
        console.log('Messages table already exists')
    }
})
.finally(() => {
    sqLiteClient.destroy()
})
