import AV, {Query, User} from 'leancloud-storage'

AV.init({
  appId: '9JBQ1SKD20ljqcJtOBbzan57-gzGzoHsz',
  appKey: 'jzuqL3dTJvWP6rqWxQTyP6v5',
  serverURL: 'https://9jbq1skd.lc-cn-n1-shared.com',
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
const Uploader = {
  add(fileName, file) {
    const item = new AV.Object('image')
    const avFile = new AV.File(fileName, file)
    item.set('filename', fileName)
    item.set('owner', AV.User.current())
    item.set('url', avFile)
    return new Promise((resolve, reject) => {
      item.save().then(
        serverFile => resolve(serverFile),
        error => reject(error))
    })
  }
}
export {Auth, Uploader}
