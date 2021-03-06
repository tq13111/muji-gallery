import React, {useRef} from 'react'
import useStore from '../stores'
import {Upload, message} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import {observer, useLocalStore} from 'mobx-react'
import styled from 'styled-components'

const {Dragger} = Upload
const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
  background: #8dc3ec;
`
const H1 = styled.h1`
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`


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
  const ref1 = useRef()
  const ref2 = useRef()
  const store = useLocalStore(() => ({
    width: null,
    height: null,
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },

    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      //?imageView2/0/w/800/h/400)
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    },
    setWidth(width) {
      store.width = width
    },
    setHeight(height) {
      store.height = height
    },
  }))

  function bindWidthChange() {
    store.setWidth(ref1.current.value)
  }

  function bindHeightChange() {
    store.setHeight(ref2.current.value)
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

      {ImageStore.serverFile ?
        <Result>
          <H1>上传结果</H1>
          <dl>
            <dt><h2>文件名：</h2></dt>
            <dd>{ImageStore.fileName}</dd>
            <dt><h2>图片预览：</h2></dt>
            <dd><Image src={ImageStore.serverFile.attributes.url.attributes.url} alt=""/></dd>
            <dt><h2>尺寸修改：</h2></dt>
            <dd>
              <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
              <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
            </dd>
            <dt><h2>保存地址：</h2></dt>
            <dd>
              <a target="_blank" href={store.fullStr}>
                {store.fullStr}
              </a>
            </dd>

          </dl>
        </Result> : null
      }
    </>
  )
})
export default Component
