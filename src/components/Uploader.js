import React, {useRef} from 'react'
import useStore from '../stores'
import {Upload, message, Spin, Input, Form} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import {observer, useLocalStore} from 'mobx-react'
import styled from 'styled-components'

const {Dragger} = Upload
const Result = styled.div`
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;

`
const H1 = styled.h1`
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`
const DraggerWrapper = styled(Dragger)`
  background: rgba(0, 0, 0, 0.4) !important;
  border: 1px solid !important;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);

  .ant-upload-text {
    color: #fff !important;
  }

  .ant-upload-hint {
    color: #ccc !important;
  }
`
const FormStyle = styled(Form)`
  height: 40px;

  > div {
    display: inline-block;
  }
`

const Component = observer(() => {
  const {ImageStore, UserStore} = useStore()
  const props = {
    showUploadList: false,     // 不显示文件列表
    beforeUpload: file => {
      ImageStore.serverFile = null
      if (!UserStore.currentUser) {
        message.warning('请先登录 !')
        return false
      }
      if (!/(gif$)| (jeg$)|(png$)|(jpeg$)/ig.test(file.type)) {
        message.error('只支持上传 jpg/jpeg/png/gif 格式的图片')
        return false
      }
      if (file.size > 1024 * 1024) {
        message.error('图片最大为 1M')
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

  function bindWidthChange(e) {
    store.setWidth(e.target.value)
  }

  function bindHeightChange(e) {
    store.setHeight(e.target.value)
  }

  const validatorUsername = (rule, value) => {
    if (!/^[0-9]*$/.test(value)) {return Promise.reject('只能是数字')}
    return Promise.resolve()
  }

  return (
    <>
      <Spin spinning={ImageStore.isUploading}>
        <DraggerWrapper {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
          <p className="ant-upload-hint">
            支持jpg/jpeg/png/gif 格式的图片,可单次或批量上传。
          </p>
        </DraggerWrapper>
      </Spin>

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
              <FormStyle name="basic">
                <Form.Item name="width"
                           rules={[{validator: validatorUsername}]}>
                  <Input style={{width: '200px', marginRight: '16px'}} ref={ref1} onChange={bindWidthChange}
                         placeholder="最大宽度（可选）"/>
                </Form.Item>
                <Form.Item name="height"
                           rules={[{validator: validatorUsername}]}>
                  <Input style={{width: '200px'}} ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
                </Form.Item>
              </FormStyle>
            </dd>
            <dt><h2>保存地址：</h2></dt>
            <dd>
              <a target="_blank" rel="noopener noreferrer"
                 href={store.fullStr}>
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
