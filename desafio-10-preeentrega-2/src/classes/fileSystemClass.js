import { promises as fs } from 'fs'

class fileSystemClass {

    constructor(fileRoute) {
        this.fileRoute = fileRoute
    }

    async getById(id) {
        const objs = await this.getAll()
        const objFound = objs.find(obj => obj.id == id)
        return objFound
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.fileRoute, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async add(newObj) {
        const objs = await this.getAll()
        objs.push(newObj)

        try {
            await fs.writeFile(this.fileRoute, JSON.stringify(objs, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Error at saving: ${error}`)
        }
    }

    async edit(elem) {
        const objs = await this.getAll()
        const index = objs.findIndex(obj => obj.id == elem.id)
        if (index == -1) {
            throw new Error(`Error at editing: ID: ${id} not found.`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.fileRoute, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error at editing: ${error}`)
            }
        }
    }

    async deleteById(id) {
        const objs = await this.getAll()
        const index = objs.findIndex(obj => obj.id == id)
        if (index == -1) {
            throw new Error(`Error at deleting: ID: ${id} not found.`)
        }

        const deleted = objs.splice(index, 1)[0]
        try {
            await fs.writeFile(this.fileRoute, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error at deleting: ${error}`)
        }
        return deleted
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.fileRoute, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error at deleting all: ${error}`)
        }
    }
}


export default fileSystemClass