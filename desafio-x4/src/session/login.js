import { users } from '../class/usersClass.js';
import { Strategy } from 'passport-local';

export const loginStrategy = new Strategy(async (username, password, done) => {
    const usersListed = await users.getAll();
  
  
    const userFound = usersListed.find(user => user.username == username)
  
    if (!userFound) {
      return done(null, false)
    }
  
    if (userFound.password != password) {
      return done(null, false)
    }
  
    userFound.contador = 0
  
    return done(null, userFound);
})