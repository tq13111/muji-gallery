import React from 'react'
import {observer} from 'mobx-react'
import useStores from '../stores'
import {Button, Form, Input} from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 20px auto;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0%), 0 8px 10px 1px rgb(0 0 0 / 0%), 0 3px 14px 2px rgb(0 0 0 / 10%);

`
const h1 = styled.h1`
  padding-left: 600px;
`
const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 16},
}
const tailLayout = {
  wrapperCol: {offset: 4, span: 16},
}
const Component = observer(() => {
  const {AuthStore} = useStores()
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const validatorUsername = (rule, value) => {
    if (/\W/.test(value)) {return Promise.reject('只能是数字字母下划线')}
    if (value.length < 4 || value.length > 10) {return Promise.reject('长度为4~10个字符')}
    return Promise.resolve()

  }
  const validateConfirm = ({getFieldValue}) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) {return Promise.resolve()}
      return Promise.reject('两次密码不一致')
    }
  })

  return (
    <Wrapper>
      <h1>注册</h1>
      <Form {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{required: true, message: '输入用户名'}
            , {validator: validatorUsername}
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{required: true, message: '输入密码'},
            {min: 6, message: '最小长度6个字符'}
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{required: true, message: '确认密码'}, validateConfirm]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
})

export default Component
