import React from 'react'
import SigninPage from './admin/SigninPage'
import PropTypes from 'prop-types'

import {Consumer} from "graphql-react"
import jwt from "jsonwebtoken"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSigninPageModal: false,
        }
        this.logout = this.logout.bind(this)
        this.showSigninPageModal = this.showSigninPageModal.bind(this)
        this.closeSigninPageModal = this.closeSigninPageModal.bind(this)

    }

    showSigninPageModal(e) {
        e.preventDefault()
        this.setState({showSigninPageModal: true})
    }

    closeSigninPageModal() {
        this.setState({showSigninPageModal: false})
    }

    logout(e) {
        e.preventDefault()
        window.location.reload()
        localStorage.removeItem('SecurityManager')
        this.context.router.history.push('/signin')
    }

    render() {
        const {showSigninPageModal}=this.state
        let isAuthenticated = false
        let token
        if (localStorage.getItem('SecurityManager')) {
            token = jwt.decode(localStorage.getItem('SecurityManager'))
            isAuthenticated = true
        }

        const userLinks = (<div className="navbar-nav flex-row ml-md-auto">
            {token && token.role === 'host' }
            <a href="/logout" className="nav-item nav-link" onClick={this.logout}>Logout </a>
            {token && <a href="" className="nav-item nav-link">{token.username}</a>}

        </div>)

        const guestLinks = (
            <div className="navbar-nav flex-row ml-md-auto">
                <a href="" className="nav-item nav-link" onClick={this.showSigninPageModal}>Sign in</a>
            </div>)

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="/">
                    Security Manager
                </a>
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                        {/*data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
                        {/*aria-expanded="false" aria-label="Toggle navigation">*/}
                    {/*<span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
                 <SigninPage show={showSigninPageModal} onClose={this.closeSigninPageModal}/>
            </nav>


        )
    }
}


export default NavigationBar