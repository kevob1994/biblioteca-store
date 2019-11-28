import React, { Component, createRef } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types';

class EditBook extends Component {
    
    tituloInput = createRef();
    ISBMInput = createRef();
    editorialInput = createRef();
    existenciaInput = createRef();

    handleOnSubmit = e => {
        e.preventDefault()
        const editBook = {
            titulo: this.tituloInput.current.value,
            ISBM: this.ISBMInput.current.value,
            editorial: this.editorialInput.current.value,
            existencia: this.existenciaInput.current.value
        }

        const { libro, firestore, history } = this.props

        firestore.update({ 
            collection: 'libros',
            doc: libro.id
        }, editBook)
            .then( () => {history.push('/')})
    }

    render() {
        const {libro} = this.props;
        console.log(libro)
        if(!libro) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link 
                        to={`/`}
                        className="btn btn-secondary"
                    >
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i> {''}
                        Editar Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.handleOnSubmit}>

                                <div className="form-group">
                                    <label >Titulo:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre de Libro"
                                        required
                                        ref={this.tituloInput}
                                        defaultValue={libro.titulo}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >Editorial:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del Libro"
                                        required
                                        ref={this.editorialInput}
                                        defaultValue={libro.editorial}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >ISBM:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="ISBM"
                                        placeholder="ISBN del libro"
                                        required
                                        ref={this.ISBMInput}
                                        defaultValue={libro.ISBM}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >Codigo:</label>
                                    <input 
                                        type="number" 
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad del Libro"
                                        required
                                        ref={this.existenciaInput}
                                        defaultValue={libro.existencia}
                                    />
                                </div>

                                <input type="submit" className="btn btn-success" value="Editar libro"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditBook.propTypes = {
    firestore : PropTypes.object.isRequired,
}
 
export default compose(
    firestoreConnect( props => [{
        collection: 'libros',
        storeAs : 'libro',
        doc : props.match.params.id
    }]),
    connect(({ firestore: {ordered}}, props) => ({
        libro : ordered.libro && ordered.libro[0]
    }))
)(EditBook)