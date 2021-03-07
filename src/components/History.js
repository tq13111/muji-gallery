import React, {useEffect} from 'react'
import useStore from '../stores'
import {observer} from 'mobx-react'
import {Button, List, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'

const LoadingContainer = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
`
const Message = styled.div`
  position: absolute;
  left: 260px;
`
const Nav = styled.div`
  width: 600px;
  position: absolute;
  left: 660px;
`
const A = styled.a`
  display: inline-block;
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ImgList = styled(List)`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #eee;
  padding: 16px 32px;
  overflow: auto;
  height: 800px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 0%), 0 8px 10px 1px rgb(0 0 0 / 0%), 0 3px 14px 2px rgb(0 0 0 / 10%);
  border-radius: 4px;
`

const Component = observer(
  () => {
    const {HistoryStore} = useStore()
    const loadMore = () => HistoryStore.pullList()

    useEffect(() => {
      return () => {
        HistoryStore.reset()
      }
    }, [])
    return (
      <InfiniteScroll
        // initialLoad={true}
        pageStart={HistoryStore.page}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        useWindow={false}
      >
        <ImgList
          dataSource={HistoryStore.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <div>
                <img src={item.attributes.url.attributes.url} style={{height: '100px'}} alt="图片加载失败"/>
              </div>
              <Message>
                <p>{item.attributes.filename}</p>
                <p>{dayjs(item.createdAt.toISOString()).format('YYYY年MM月DD日h时m分s秒')}</p>
              </Message>
              <Nav><A target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</A>
              </Nav>
              <Button type="primary" danger onClick={() => HistoryStore.remove(item.id)}>
                删除
              </Button>
            </List.Item>

          )}
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <LoadingContainer>
              <Spin/>
            </LoadingContainer>
          )}
        </ImgList>
      </InfiniteScroll>
    )
  })
export default Component
