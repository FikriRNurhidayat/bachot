import React, {
  Component,
  Fragment
} from 'react'

import {
  Layout
} from 'antd'

import '../../assets/css/content.css'
import Chat from '../child/Chat.js'

const {
  Content,
  Footer
} = Layout

class Base extends Component {
  render() {
    return (
      <Fragment>
        <div className="content-header">
          <div className="title">Bachot</div>
          <div className="body">
            This is a very simple chat app
            <p>Implementing websocket directly using built-in Javascript module called WebSocket</p>
           </div>
        </div>
        <Content style={{
          overflowY: 'auto'
        }}>
          <div className="content-container">
            { this.props.data }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bachot ©2020 Created by Fikri</Footer>
      </Fragment>
    )
  }
}

export default Base
