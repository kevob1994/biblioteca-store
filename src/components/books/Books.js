import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types';

const Books = ({libros, firestore}) => {

    if(!libros) return <Spinner />
    
    const deleteBook = id => {
        console.log(id)
        firestore.delete({
            collection: 'libros',
            doc: id        
        }, id )
    }

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <Link
                    to="/libros/nuevo"
                    className="btn btn-success"
                >   
                    <i className="fa fa-plus" aria-hidden="true"></i> {''}
                    Nuevo Libro
                </Link>
            </div>
            <div>
                <h2>
                    <i className="fas fa-book"></i> {''}
                    Libros
                </h2>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map( libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link
                                    className="btn btn-success btn-block"
                                    to={`/libros/mostrar/${libro.id}`}
                                >
                                    <i className="fas fa-angle-double-right"></i>
                                    Mas informacion
                                </Link>
                                <button
                                        onClick={() => deleteBook(libro.id)}
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        // onClick={ () => deleteSubscriber(subscriber.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> {''}
                                        Eliminar
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
Books.propTypes = {
    firestore : PropTypes.object.isRequired,
    subscribers : PropTypes.array
}
 
export default compose(
    firestoreConnect([{ collection : 'libros' }]),
    connect((state, props) => ({
        libros: state.firestore.ordered.libros,
    }))
)(Books);
