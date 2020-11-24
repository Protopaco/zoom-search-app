import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent'

export default class LandingPage extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = await request
            .post('https://alchezoomy.herokuapp.com/auth/signin')
            .send(this.state);
        this.props.history.push('/student')
        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token);

        ;
    }

    render() {
        return (
            <div className='landing'>
                <h1 className='landing-tagline'>Never miss a beat.</h1>
                <h2 className='landing-description'>Search uploaded Zoom videos and chat logs for easy reference.</h2>
                <a href='https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://alchezoomy2.netlify.app/redirect'><button className='teacher-button'>Teacher Login</button></a>
                <div className='box'>
                    <form onSubmit={this.handleSubmit}>
                        <h2 className='student-login'>Student Login</h2>
                        <p className='email'>E-mail:</p>
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email}></input>
                        <p className='password'>Password:</p>
                        <input onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password} type="password" />
                        <br /><button className='login-button'>Submit</button>
                        <br />
                        <p className='sign-up'>Not a user? <Link to='/signup' className='link'>Sign up here</Link>.</p>


                    </form>
                </div>
            </div>
        )
    }
}

