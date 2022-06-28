import dontenv from 'dotenv'
dontenv.config()

export default {
  cnxStr: process.env.MONGO_SV,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }
}