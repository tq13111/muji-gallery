import React, {useEffect} from 'react'
import useStore from '../stores'
import {observer} from 'mobx-react'
import {List, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import dayjs from 'dayjs'

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
        <List
          dataSource={HistoryStore.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <div>
                <img src={item.attributes.url.attributes.url} style={{height: '100px'}}/>
              </div>
              <Message>
                <p>{item.attributes.filename}</p>
                <p>{dayjs(item.createdAt.toISOString()).format('YYYY年MM月DD日h时m分s秒')}</p>
              </Message>
              <div><a target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
              </div>
            </List.Item>

          )}
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <LoadingContainer>
              <Spin/>
            </LoadingContainer>
          )}
        </List>
      </InfiniteScroll>
    )
  })
export default Component
