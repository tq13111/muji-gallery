import React, {useRef} from 'react'
import useStore from '../stores'

const Component = () => {
  const ref = useRef()
  const {ImageStore} = useStore()

  function bindChange() {
    if (ref.current.files.length > 0) {
      ImageStore.setFile(ref.current.files[0])
      ImageStore.setFileName(ref.current.files[0].name)
      ImageStore.upload()
        .then(() => console.log('上传成功'))
        .catch(error => console.log('上传失败：' + error))
    }
  }

  return (
    <div>
      <h1>上传文件</h1>
      <input type="file" ref={ref} onChange={bindChange}/>
    </div>
  )
}
export default Component
