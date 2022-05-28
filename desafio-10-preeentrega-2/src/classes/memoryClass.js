class memoryClass {
    constructor() {
      this.objs = []
    }
  
    getAll() {
      return [...this.objs]
    }
  
    getById(id) {
      const objFound = this.objs.find((obj) => obj.id === Number(id))
      if (!objFound) {
        throw new Error(`Error: ID: ${id} not found.`)
      } else {
        return objFound
      }
    }

    addItem(obj) {
      this.objs.push(obj)
      return [...this.objs]
    }
  
    edit(elem) {
      this.objs = this.objs.map((obj) => (obj.id == elem.id ? obj : elem))
      return [...this.objs]
    }
  
    deleteById(id) {
      const deleted = this.objs.filter((obj) => obj.id !== Number(id))
      if (JSON.stringify(this.objs) === JSON.stringify(deleted)) {
        return false
      } else {
        this.objs = deleted
        return true
      }
    }
  
    deleteAll() {
      this.objs = []
    }
  }
  
export default memoryClass