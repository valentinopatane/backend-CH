import MongoClass from "../../classes/mongoClass"

class productsDaoMongo extends MongoClass {
  constructor() {
    super('products', {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      thumbnail: { type: String, required: false },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    })
  }
}

export default productsDaoMongo