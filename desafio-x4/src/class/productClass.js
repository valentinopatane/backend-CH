import  configMySql from '../config/configMySql.js';//<---MySQL Config
import SQL from '../handlers/productClass.js' //<---Product class using MySQL

export const products = new SQL(configMySql,'products')