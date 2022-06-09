import admin from 'firebase-admin'
import config from '../config.js'


admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  //url
})
const db = admin.firestore()


class firebaseClass {
  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }

  async readFile() {
    try {
      return JSON.parse(await fs.promises.readFile(`DB/${this.fileName}.json`, 'utf-8'))
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async writeFile(data) {
    try {
      fs.promises.writeFile(`DB/${this.fileName}.json`, JSON.stringify(data), 'utf-8')
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
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
      const itemFound = objs.find((obj) => obj.id === Number(id))
      return itemFound
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
      const filteredItemList = objs.filter((obj) => obj.id !== Number(id))
      if (JSON.stringify(objs) === JSON.stringify(filteredItemList)) {
        return false
      } else {
        await this.writeFile(filteredItemList)
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
      let itemFound = objs.find((obj) => obj.id === Number(containerId))
      itemFound.productos.push(object)
      objs = objs.map((obj) => (obj.id !== itemFound.id ? obj : itemFound))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async removeFrom(containerId, objectId) {
    try {
      let objs = await this.readFile()
      let itemFound = objs.find((obj) => obj.id === Number(containerId))
      itemFound.productos = itemFound.productos.filter((obj) => obj.id !== Number(objectId))
      objs = objs.map((obj) => (obj.id !== itemFound.id ? obj : itemFound))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async emptyContainer(containerId) {
    try {
      let objs = await this.readFile()
      let itemFound = objs.find((obj) => obj.id === Number(containerId))
      itemFound.productos = []
      objs = objs.map((obj) => (obj.id !== itemFound.id ? obj : itemFound))
      await this.writeFile(objs)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

}

export default firebaseClass