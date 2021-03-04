import {observable, action, makeObservable} from 'mobx'
import Auth from '../models/index'

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
          console.log('登陆成功')
          resolve(user)
        })
        .catch(error => {
          console.log('登陆失败')
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
    console.log('已注销')
  }

}

export default new AuthStore()
