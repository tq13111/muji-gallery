import {observable, action, makeObservable} from 'mobx'
import {Uploader} from '../models'
import {message} from 'antd'

class AuthStore {
  @observable list = []
  @observable page = 0
  @observable limit = 10
  @observable isLoading = false
  @observable hasMore = true

  constructor() {
    makeObservable(this)
  }

  @action append(newList) {
    this.list = newList.concat(this.list)
  }

  @action pullList() {
    Uploader.find({page: this.page, limit: this.limit})
      .then(result => {
        this.page++
        this.append(result)
      })
      .catch(error => message.error('加载数据失败'))
  }
}

export default new AuthStore()
