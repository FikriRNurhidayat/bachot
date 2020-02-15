import React, {
  Component,
  Fragment
} from 'react'
import PropTypes from 'prop-types';

// Component and stuff
import {
  connect
} from 'react-redux'
import {
  Empty,
  Input,
  Button,
  Comment,
  Icon,
  Tooltip,
  Avatar,
  Modal
} from 'antd';
import '../../assets/css/chat.css'
import Login from './Login.js'

// Action
import Socket from '../../actions/socket.js'
import { login } from '../../actions/user.js'

const {
  sendMessage
} = Socket

const {
  TextArea
} = Input

const TextAreaConfig = {
  minRows: 1,
  maxRows: 4
}

class Chat extends Component {
  state = {
    isSending: false,
    message: '',
    messages: []
  }

  componentDidUpdate() {
    this.props.socket.onmessage = this.handleOnMessage
  }

  login = ({ name }) => {
    this.props.login({
      name
    })
      .then(() => this.props.connect())
  }

  get Modal() {
    let user = localStorage.getItem('user')
    let isUnauthorized = !user || Object.keys(user).length == 0 

    return (
      <Modal
        visible={isUnauthorized}
        title={null}
        okText="Login"
        footer={null}
        closable={false}
        centered
      >
        <div className="login-form">
          <Login onSubmit={this.login}/>
        </div>
      </Modal>
    )
  }

  showModal = () => {
    this.setState({
      isModalShown: true
    })
  }

  handleOnMessage = e => {
    let {
      status,
      data
    } = JSON.parse(e.data)

    if (!status) return
    this.setState({
      messages: [...this.state.messages, data]
    })
  }

  handleOnClickOrEnter = e => {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  handleChatInput = e => {
    this.setState({
      message: e.target.value
    })
  }

  renderMessage = () => {
    return this.state.messages.map((i, index) => {
      let content = (
        <p>{i.message}</p>
      )

      return (
        <Comment 
          key={index}
          author={i.from.name}
          avatar={
            <Icon type="user" />
          }
          content={content}
        />
      )
    })
  }

  render() {
    return (
      <Fragment>
        { this.Modal }
        <div className="chat-container">
          <div className="chat-content">
            { this.state.messages.length == 0 ?
              (
                <Empty
                  description="There's no chat here"
                  className="empty-container"
                />
              ) : (
                this.renderMessage()
              )
            }
          </div>
          <div className="chat-input">
            <TextArea
              rows={1}
              autoSize={TextAreaConfig}
              value={this.state.message}
              onChange={this.handleChatInput}
              onPressEnter={this.handleOnClickOrEnter}
            />
            <Button
              type="primary"
              icon={this.state.isSending ? "loading" : "caret-right"}
              onClick={this.handleOnClickOrEnter}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

Chat.propTypes = {
  authorized: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
    user: state.user
  }
}

export default connect(mapStateToProps, { sendMessage, login, connect: Socket.connect })(Chat)
