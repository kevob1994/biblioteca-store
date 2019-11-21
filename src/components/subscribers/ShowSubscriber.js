import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types';
import '../../App.css';

const ShowSubscriber = ({ suscriptor }) => {
    
    if(!suscriptor) return <Spinner />

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/suscriptores" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al listado
                </Link>
            </div>
            <div className="col-md-6">
            <Link to={`/suscriptores/editar/${suscriptor.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i> {''}
                    Editar Suscriptor
                </Link>
            </div>

            <hr className="mx-5 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">
                    {suscriptor.nombre} {suscriptor.apellido}
                </h2>
            </div>
            <div className="box">
                <p>
                    <span className="font-wight-bold">
                        Carrera: 
                    </span> {''}
                    {suscriptor.carrera}
                </p>
                <p>
                    <span className="font-wight-bold">
                        Codigo: 
                    </span> {''}
                    {suscriptor.codigo}
                </p>
            </div>
            
        </div>
    )
}

ShowSubscriber.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect( props => [{
        collection: 'suscriptores',
        storeAs : 'suscriptor',
        doc : props.match.params.id
    }]),
    connect(({ firestore: {ordered}}, props) => ({
        suscriptor : ordered.suscriptor && ordered.suscriptor[0]
    }))
)(ShowSubscriber)