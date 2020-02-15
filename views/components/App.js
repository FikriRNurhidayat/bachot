import React, { Component } from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon
} from 'antd'

// Assets
import 'antd/dist/antd.css';
import '../assets/css/index.css'

// Child Component
import Header from './base/Header.js'
import Content from './base/Content.js'
import Chat from './child/Chat.js'

// Action
import {
  connect
} from 'react-redux'
import Socket from '../actions/socket.js'
import {
  setUser
} from '../actions/user.js'

class App extends Component {
  componentDidMount() {
    this.props.setUser()
      .then(user => {
        if (this.props.user) {
          this.props.connect()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  get isLoggedIn() {
    return Object.keys(this.props.user).length > 0
  }

  render() {
    let chatProps = {
      authorized: this.isLoggedIn
    }

    return (
      <Layout style={{
        height: '100vh'
      }}>
        <Header/>
        <Content
          data={ <Chat {...chatProps} /> }
        />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  connect: Socket.connect,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
