import { users } from '../class/usersClass.js';
import { Strategy } from 'passport-local';

export const registerStrategy = new Strategy(
    {
    passReqToCallback: true
    },
    async (req, username, password, done) => {
  
    const { email } = req.body
  
    const usersListed = await users.getAll();
  
    const userFound = usersListed.find(user => user.username == username)
    if (userFound) {
      return done('already registered')
    }
    const newUser = {
      username,
      password,
      email,
    }
    users.add(newUser)
  
    return done(null, newUser)
  })