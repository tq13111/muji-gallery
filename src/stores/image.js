import {observable, action, makeObservable} from 'mobx'
import {Uploader} from '../models/index'
import {message} from 'antd'

class ImageStore {
  constructor() {
    makeObservable(this)
  }

  @observable fileName = ''
  @observable file = null
  @observable isUploading = false
  @observable serverFile = null

  @action setFileName(fileName) {
    this.fileName = fileName
  }

  @action setFile(file) {
    this.file = file
  }

  @action upload() {
    this.isUploading = true
    return new Promise((resolve, reject) =>
      Uploader.add(this.fileName, this.file)
        .then(serverFile => {
          this.serverFile = serverFile
          resolve(serverFile)
        })
        .catch(error => {
          message.error('上传失败')
          reject(error)
        })
        .finally(() => this.isUploading = false)
    )
  }
}

export default new ImageStore()
