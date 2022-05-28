import firebaseClass from "../../classes/firebaseClass"

class cartsDaoFirebase extends firebaseClass {
  constructor() {
    super('carts')
  }
}

export default cartsDaoFirebase