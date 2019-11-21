import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
class NewSubscriber extends Component {

    state = {
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''
    }

    handleOnChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleOnSubmit = e => {
        e.preventDefault()
        const newSubscriber = this.state
        const { firestore, history } = this.props

        firestore.add({ collection: 'suscriptores' }, newSubscriber)
            .then( () => {history.push('/suscriptores')})
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link 
                        to={`/suscriptores`}
                        className="btn btn-secondary"
                    >
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus"></i> {''}
                        Nuevo Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.handleOnSubmit}>

                                <div className="form-group">
                                    <label >Nombre:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del Suscriptor"
                                        required
                                        onChange={ this.handleOnChange }
                                        value={this.state.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >Apellido:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="apellido"
                                        placeholder="Apellido del Suscriptor"
                                        required
                                        onChange={ this.handleOnChange }
                                        value={this.state.apellido}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >Carrera:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="carrera"
                                        placeholder="Carrera del Suscriptor"
                                        required
                                        onChange={ this.handleOnChange }
                                        value={this.state.carrera}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >Codigo:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="codigo"
                                        placeholder="Codigo del Suscriptor"
                                        required
                                        onChange={ this.handleOnChange }
                                        value={this.state.codigo}
                                    />
                                </div>

                                <input type="submit" className="btn btn-success" value="Agregar suscriptor"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NewSubscriber.propTypes = {
    firestore : PropTypes.object.isRequired,
}

export default firestoreConnect()(NewSubscriber)