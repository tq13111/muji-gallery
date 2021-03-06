import React from 'react'
import useStore from '../stores'
import {Upload, message} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react'

const {Dragger} = Upload

const Component = observer(() => {
  const {ImageStore} = useStore()
  const props = {
    beforeUpload: file => {
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
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
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
