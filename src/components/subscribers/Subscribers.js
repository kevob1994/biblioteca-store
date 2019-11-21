import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types';

const Subscribers = ({subscribers, firestore, history}) => {

    if(!subscribers) return <Spinner />

    const deleteSubscriber = (id) => {
        firestore.delete({
            collection: 'suscriptores',
            doc : id
        })
    }

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link
                    to="/suscriptores/nuevo"
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subscribers.map(subscriber => (
                            <tr key={subscriber.id}>
                                <td>{subscriber.nombre} {subscriber.apellido}</td>
                                <td>{subscriber.carrera}</td>
                                <td>
                                    <Link
                                        to={`/suscriptores/mostrar/${subscriber.id}`}
                                        className="btn btn-success btn-block"
                                    >
                                        <i className="fas fa-angle-double-right"></i> {''}
                                        Mas informacion
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        onClick={ () => deleteSubscriber(subscriber.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> {''}
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

Subscribers.propTypes = {
    firestore : PropTypes.object.isRequired,
    subscribers : PropTypes.array
}
 
export default compose(
    firestoreConnect([{ collection : 'suscriptores' }]),
    connect((state, props) => ({
        subscribers: state.firestore.ordered.suscriptores,
    }))
)(Subscribers);


 
