import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 120px auto;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0%), 0 8px 10px 1px rgb(0 0 0 / 0%), 0 3px 14px 2px rgb(0 0 0 / 10%);
`
const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 16},
}
const tailLayout = {
  wrapperCol: {offset: 4, span: 16},
}
export {Wrapper,layout,tailLayout}
