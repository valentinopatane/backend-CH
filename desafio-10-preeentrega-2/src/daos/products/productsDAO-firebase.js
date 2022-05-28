import firebaseClass from "../../classes/firebaseClass"

class productsDaoFirebase extends firebaseClass {
  constructor() {
    super('products')
  }
}

export default productsDaoFirebase