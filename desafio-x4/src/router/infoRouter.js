import { Router } from 'express';


const infoRouter = Router();

infoRouter.get('/', (req,res) => {

    const datos = {
        execArg: process.execArgv,
        platform: process.platform,
        nodeVersion:process.versions.node,
        memory: process.memoryUsage.rss,
        execPath: process.argv[0],
        processID: process.pid,
        projectFolder: process.argv[1],
    }
    res.send(JSON.stringify(datos))
})



export default infoRouter