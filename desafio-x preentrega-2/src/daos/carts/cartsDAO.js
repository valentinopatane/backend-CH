let cartsDAO

switch (process.env.DB_ENV) {
  case 'json':
    const { default: cartsDAOfileSystem } = await import('./cartsDAO-fileSystem.js')
    cartsDAO = new cartsDAOfileSystem('carts')
    break
  case 'mongodb':
    const { default: cartsDAOmongo } = await import('./cartsDAO-mongo.js')
    cartsDAO = new cartsDAOmongo()
    break
  case 'firebase':
    const { default: cartsDAOfirebase } = await import('./cartsDAO-firebase.js')
    cartsDAO = new cartsDAOfirebase()
    break
  default:
    const { default: cartsDAOmemory } = await import('./cartsDAO-memory.js')
    cartsDAO = new cartsDAOmemory()
    break
}

export { cartsDAO }