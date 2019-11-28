import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types';
import '../../App.css';

class ShowBook extends Component {

    devolverLibro(id_student){
        const {firestore} = this.props;
        const bookUpdate = {...this.props.libro}
        console.log("libroUpdate")
        // console.log(libroUpdate)
        const loan = bookUpdate.prestados.filter( student => student.codigo !== id_student)
        bookUpdate.prestados = loan
        console.log(loan)
        console.log(bookUpdate)
        firestore.update({
            collection: 'libros',
            doc: bookUpdate.id,
        }, bookUpdate)
    }

    render() {

        const { libro } = this.props

        if(!libro) return <Spinner />
        
        let btnPrestamo;

        if(libro.existencia - libro.prestados.length > 0){
            btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`} className="btn btn-success my-3"
                          > Solicitar Prestamo</Link>
        }else{
            btnPrestamo=null
        }

        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> {''}
                        Editar libro
                    </Link>
                </div>

                <hr className="mx-5 w-100"/>

                <div className="col-12">
                    <h2 className="mb-4">{libro.titulo}</h2>
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> {''}
                        {libro.ISBM}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existencia:
                        </span> {''}
                        {libro.existencia}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {''}
                        {libro.existencia - libro.prestados.length}
                    </p>

                    {btnPrestamo}
                    
                    <h3 className="my-2">Lista de prestamos</h3>
                    {libro.prestados.map( prestado => (
                        <div key={prestado.codigo} className="card my-2">
                            <h4 className="card-header">
                                {prestado.nombre} {prestado.apellido}
                            </h4>
                            
                            <div className="card-body">
                            <p>
                                <span className="font-weight-bold">
                                    Codigo:
                                </span> {''}
                                {prestado.codigo}
                            </p>
                            <p>
                                <span className="font-weight-bold">
                                    Carrera:
                                </span> {''}
                                {prestado.carrera}
                            </p>
                            <p>
                                <span className="font-weight-bold">
                                    Fecha de solicitud:
                                </span> {''}
                                {prestado.fecha_solicitud}
                            </p>
                            </div>
                            <div className="card-footer">
                                <button
                                    type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={() => this.devolverLibro(prestado.codigo)}
                                >
                                    Devolucion de libro
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

ShowBook.propTypes = {
    firestore : PropTypes.object.isRequired
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
)(ShowBook)