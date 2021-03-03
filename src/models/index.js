import AV, {Query, User} from 'leancloud-storage'

AV.init({
  appId: '9JBQ1SKD20ljqcJtOBbzan57-gzGzoHsz',
  appKey: 'jzuqL3dTJvWP6rqWxQTyP6v5',
  serverURL: 'https://9jbq1skd.lc-cn-n1-shared.com'
})

const Auth = {
  register(userName, passWord) {
    const user = new User()
    user.setUsername(userName)
    user.setPassword(passWord)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginUser => resolve(loginUser)
        , (error) => reject(error)
      )
    })
  },
  login(userName, passWord) {
    return new Promise((resolve, reject) => {
      User.logIn(userName, passWord).then(loginedUser => resolve(loginedUser)
        , (error) => reject(error)
      )
    })
  },
  logOut() {
    return User.logOut()
  },
  getCurrentUser() {
    return User.current()
  }
}
export default Auth
