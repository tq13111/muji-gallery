import React from 'react'
import useStore from '../stores'
import {Upload, message} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react'

const {Dragger} = Upload

const Component = observer(() => {
  const {ImageStore, UserStore} = useStore()
  const props = {
    beforeUpload: file => {
      if (!UserStore.currentUser) {
        message.warning('请先登录 !')
        return false
      }
      ImageStore.setFile(file)
      ImageStore.setFileName(file.name)
      ImageStore.upload()
        .then((serverFile) => console.log(serverFile))
        .catch(error => console.log('上传失败：' + error))
      return false
    }
  }

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
        <p className="ant-upload-hint">
          支持单次或批量上传。严格禁止上传公司数据或其他乐队文件
        </p>
      </Dragger>
      <div>
        <h1>上传结果</h1>
        {ImageStore.serverFile ?
          <div>{ImageStore.serverFile.attributes.url.attributes.url}</div> : null
        }
      </div>
    </>
  )
})
export default Component
