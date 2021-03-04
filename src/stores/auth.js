import {observable, action, makeObservable} from 'mobx'
import Auth from '../models/index'
import User from './user'

class AuthStore {
  constructor() {
    makeObservable(this)
  }

  @observable values = {
    username: '',
    password: ''
  }

  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          User.pullUser()
          resolve(user)
        })
        .catch(error => {
          User.resetUser()
          reject(error)
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          console.log('注册成功')
          resolve(user)
        })
        .catch(error => {
          console.log('注册失败')
          reject(error)
        })
    })
  }

  @action logout() {
    User.resetUser()
    return Auth.logOut()

  }

}

export default new AuthStore()
