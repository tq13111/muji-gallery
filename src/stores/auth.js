import {observable, action, makeObservable} from 'mobx'
import {Auth} from '../models/index'
import User from './user'
import {message} from 'antd'
import HistoryStore from './history'
import ImageStore from './image'
import UserStore from './user'


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
          message.error('登陆失败')
          reject(error)
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          console.log('注册成功')
          resolve(user)
        })
        .catch(error => {
          console.log(typeof error.valueOf(), error.toString())
          if (error.toString() === 'Error: Username has already been taken. [400 POST https://9jbq1skd.lc-cn-n1-shared.com/1.1/users]') {
            message.error('该用户名已被注册,请重试')
          } else {
            message.error('注册失败')
          }
          UserStore.resetUser()
          reject(error)
        })
    })
  }

  @action logout() {
    User.resetUser()
    HistoryStore.reset()
    ImageStore.reset()
    return Auth.logOut()

  }
}

export default new AuthStore()
