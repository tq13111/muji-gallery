import React from 'react'
import LogoUrl from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'
import useStore from '../stores'
import {observer} from 'mobx-react'

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;
`

const Logo = styled.img`
  height: 30px;
`

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  &.active {
    border-bottom: 1px solid #fff;
  }
`

const Login = styled.div`
  margin-left: auto;
`

const StyledButton = styled(Button)`
  margin-left: 24px;
`


const Component = observer(
  () => {
    const {UserStore, AuthStore} = useStore()
    const handleLogout = () => AuthStore.logout()
    const handleLogin = () => {}
    const handleRegister = () => {}

    return (
      <Header>
        <Logo src={LogoUrl}/>
        <nav>
          <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
          <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
          <StyledLink to="/about" activeClassName="active">关于我</StyledLink>
        </nav>
        <Login>
          {
            UserStore.currentUser ?
              <>
                {UserStore.currentUser.attributes.username}<StyledButton type="primary"
                                                                          onClick={handleLogout}>注销</StyledButton>
              </> :
              <>
                <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
              </>
          }
        </Login>

      </Header>
    )
  }
)

export default Component
