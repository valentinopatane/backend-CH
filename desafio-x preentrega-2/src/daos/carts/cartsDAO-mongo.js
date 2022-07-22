import MongoClass from "../../classes/mongoClass"

class cartsDaoMongo extends MongoClass {
  constructor() {
    super('carts', {
      id: { type: Number, required: true },
      products: { type: Array, required: false },
    })
  }
}

export default cartsDaoMongo