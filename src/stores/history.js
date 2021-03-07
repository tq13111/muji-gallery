import {observable, action, makeObservable} from 'mobx'
import {Uploader} from '../models'
import {message} from 'antd'

class HistoryStore {
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
        this.hasMore = false
      })
      .catch(error => message.error('加载数据失败'))
  }

  @action remove(file) {
    Uploader.remove(file)
      .then(() => {
        this.reset()
        console.log('删除成功')
      })
      .catch(error => message.error('删除数据失败'))
  }

  @action reset() {
    this.list = []
    this.page = 0
    this.limit = 10
    this.isLoading = false
    this.hasMore = true
  }
}

export default new HistoryStore()
