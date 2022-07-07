import { Router } from 'express';
import compression from 'compression'

const infoRouter = Router();

infoRouter.get('/', compression(), (req,res) => {

    let info = {
        args: process.argv,
        platform: process.platform,
        version: process.version,
        memory: JSON.stringify(process.memoryUsage()),
        path: process.execPath,
        pid: process.pid,
        cwd: process.cwd(),
        CPUS: numCPUs
      }
      res.json(info);
})



export default infoRouter