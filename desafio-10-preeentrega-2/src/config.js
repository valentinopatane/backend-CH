export default {
    fileSystem: {
      path: './database',
    },
    mongodb: {
      cnxStr: 'srv+mongodb://xxxxxxxxxxxxxxxxxxx',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {},
}