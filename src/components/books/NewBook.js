import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NewBook extends Component {
    constructor(){
        super();
        this.state = {
            titulo : '',
            ISBN : '',
            editorial : '',
            existencia : '',
        }

    }

    readData = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    registerBook = (e) => {

        e.preventDefault();

        const newBook = {...this.state, prestados: []}

        const {firestore, history} = this.props

        firestore.add({collection: 'libros'}, newBook)
            .then( () => history.push('/'))
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <Link
                            className="btn btn-secondary"
                            to='/'
                        >
                            <i className="fas fa-arrow-circle-left"></i> {''}
                            Volver al listado
                        </Link>
                    </div>
                    <div className="col-12">
                        <h2>
                            <i className="fas fa-book"></i> {''}
                            Nuevo libro
                        </h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 mt-5">
                        <form onSubmit={this.registerBook}>
                            <div className="form-group">
                                <label>Titulo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo o Nombre de Libro"
                                    required
                                    value= {this.state.titulo}
                                    onChange = {this.readData}
                                />
                            </div>

                            <div className="form-group">
                                <label>Editorial:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial del Libro"
                                    required
                                    value= {this.state.editorial}
                                    onChange = {this.readData}
                                />
                            </div>

                            <div className="form-group">
                                <label>ISBM:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ISBM"
                                    placeholder="ISBM del Libro"
                                    required
                                    value= {this.state.ISBM}
                                    onChange = {this.readData}
                                />
                            </div>

                            <div className="form-group">
                                <label>Existencia:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="existencia"
                                    placeholder="Cantidad del Libro"
                                    required
                                    value= {this.state.existencia}
                                    onChange = {this.readData}
                                />
                            </div>

                            <input type="submit" className="btn btn-success" value="Crear libro"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

NewBook.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewBook)