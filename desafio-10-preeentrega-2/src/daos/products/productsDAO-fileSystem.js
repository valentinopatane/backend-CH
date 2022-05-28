import fileSystemClass from "../../classes/fileSystemClass";

class productsDaoFile extends fileSystemClass {
    constructor(path){
        super(`${path}/products.json`)
    }
}

export default productsDaoFile