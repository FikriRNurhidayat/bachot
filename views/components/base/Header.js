import React, { Component } from 'react'
import {
  Layout,
} from 'antd'

import '../../assets/css/header.css'

const {
  Header
} = Layout

class Base extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo">
          <div>Bachot</div>
        </div>
      </Header>
    )
  }
}

export default Base
