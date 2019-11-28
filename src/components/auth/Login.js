import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    getData = e => {
        this.setState({ [e.target.name] : e.target.value})
    }

    login = e => {
        e.preventDefault()
        console.log(this.props)
        const {firebase} = this.props;
        const { email, password } = this.state;

        firebase.login({
            email,
            password
        }).then( response => console.log('login exitoso'))
        .catch( err => console.log("hubo un error"))
    }
    render() { 
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center-py-4">
                                <i className="fas fa-block"></i> {''}
                                Iniciar Sesion
                            </h2>

                            <form onSubmit={this.login}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="email" 
                                        required 
                                        value={this.state.email}
                                        onChange={this.getData}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password" 
                                        required 
                                        value={this.state.password}
                                        onChange={this.getData}
                                    />
                                </div>

                                <input type="submit" className="btn btn-success btn-block" value="Iniciar sesion"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase : PropTypes.object.isRequired
}

export default firebaseConnect()(Login);