export default {
    client: 'sqlite3',
    connection: {
      filename: process.cwd() + '/src/data/background.sqlite',
    },
    useNullAsDefault: true,
  }