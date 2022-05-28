import mongoose from 'mongoose'
import config from '../config.js'

//-------------------- MONGOOSE CONNECTION--------------------//

try {
    mongoose.connect(config.mongodb.cnxStr, config.mongodb.options, () => console.log('Mongoose is connected'))
} catch (error) {
  console.log('Unable to connect')
}

const dbConnection = mongoose.connection
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to database'))

//--------------------CLASS--------------------//
class MongoClass {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  async getAll() {
    try {
      const objs = await this.readFile()
      return objs
    } catch (error) {
      await this.writeFile([])
      const objs = await this.readFile()
      return objs
    }
  }

  async getById(id) {
    try {
      const objs = await this.readFile()
      const objFound = objs.find((obj) => obj.id === Number(id))
      return objFound
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async add(object) {
    try {
      const objs = await this.readFile()
      objs.push(object)
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async edit(object) {
    try {
      let objs = await this.readFile()
      objs = objs.map((obj) => (obj.id !== object.id ? obj : object))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const objs = await this.readFile()
      const filteredList = objs.filter((obj) => obj.id !== Number(id))
      if (JSON.stringify(objs) === JSON.stringify(filteredList)) {
        return false
      } else {
        await this.writeFile(filteredList)
        return true
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await this.writeFile([])
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async addInto(containerId, object) {
    try {
      let objs = await this.readFile()
      let objFound = objs.find((obj) => obj.id === Number(containerId))
      objFound.products.push(object)
      objs = objs.map((obj) => (obj.id !== objFound.id ? obj : objFound))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async removeFrom(containerId, objectId) {
    try {
      let objs = await this.readFile()
      let objFound = objs.find((obj) => obj.id === Number(containerId))
      objFound.products = objFound.products.filter((obj) => obj.id !== Number(objectId))
      objs = objs.map((obj) => (obj.id !== objFound.id ? obj : objFound))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async emptyContainer(containerId) {
    try {
      let objs = await this.readFile()
      let objFound = objs.find((obj) => obj.id === Number(containerId))
      objFound.products = []
      objs = objs.map((obj) => (obj.id !== objFound.id ? obj : objFound))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }
}

export default MongoClass