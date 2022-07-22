let productsDAO;

switch (process.env.DB_ENV) {
    case 'json':
      const { default: productsDAOfileSystem } = await import('./productsDAO-fileSystem.js')
      productsDAO = new productsDAOfileSystem('products')
      break
    case 'mongodb':
      const { default: productsDAOmongoDB } = await import('./productsDAO-mongo.js')
      productsDAO = new productsDAOmongoDB()
      break
    case 'firebase':
      const { default: productsDAOfirebase } = await import('./productsDAO-firebase.js')
      productsDAO = new productsDAOfirebase()
      break
    default:
      const { default: productsDAOmemory } = await import('./productsDAO-memory.js')
      productsDAO = new productsDAOmemory()
      break
  }

export { productsDAO };