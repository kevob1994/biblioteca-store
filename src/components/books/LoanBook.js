import React, { Component, createRef } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from './../layout/Spinner';
import PropTypes from 'prop-types';

import CardSubscriber from '../subscribers/CardSubscriber';

import {searchUser} from './../../actions/searchUserActions'

class LoanBook extends Component {
    state = {
        noResult: false,
        search: ''
    }

    handleOnChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    searchStuden = e => {
        e.preventDefault();
        
        const { search } = this.state;
        const { firestore, searchUser } = this.props;

        const collection = firestore.collection('suscriptores')
        const query = collection.where("codigo","==", search).get();
        // console.log(query)
        
        query.then( data => {
            if(data.empty){
                searchUser({})
                this.setState({
                    noResult: true
                })
            } else {
                console.log("ENTROOOOO")
                const response = data.docs[0]
                console.log(response.data())
                searchUser({...response.data()})
                this.setState({
                    noResult: false
                })
            }
        },
        err => {
            console.log(err)
        })
    }

    getLoan = () => {
        const { user, firestore, history } = this.props

        user.fecha_solicitud = new Date().toLocaleDateString();

        let bookLoan = []
        bookLoan = [...this.props.libro.prestados, user];
        const libro = {...this.props.libro}
        delete  libro.prestados
        libro.prestados = bookLoan

        firestore.update({
            collection: 'libros',
            doc: libro.id,
        }, libro).then(history.push('/'))
    }

    render() {

        const {libro} = this.props;

        if(!libro) return <Spinner />
        
        const { noResult } = this.state;
        const { user } = this.props;

        console.log("this.props")
        console.log(this.props)
        var cardStudent, btnRequest;

        if(user.nombre) {
            cardStudent = <CardSubscriber student={user}/>
            
            btnRequest = <button type="button" className="btn btn-primary btn-block" onClick={this.getLoan}> Solicitar Prestamo</button>
        } else {
            cardStudent = null;
            btnRequest = null;
        }


        let msgResult = '';

        if(noResult){
            msgResult = <div className="alert alert-danger text-center font-weight-bold ">No hay resultado para ese codigo </div>
        } else {
            msgResult = null
        }

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
                        <i className="fas fa-book"></i> {''}
                        Solicitar Prestamo : {libro.titulo}
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form
                                onSubmit={this.searchStuden}
                                className="mb-4"
                            >
                                <legend>
                                    Busca el Suscriptor por Codigo
                                </legend>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        name="search"
                                        className="form-control"
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block" value="Buscar Alumno"/>
                            </form>

                            {cardStudent}
                            {btnRequest}

                            {msgResult}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoanBook.propTypes = {
    firestore : PropTypes.object.isRequired,
}
 
export default compose(
    firestoreConnect( props => [{
        collection: 'libros',
        storeAs : 'libro',
        doc : props.match.params.id
    }]),
    connect(({ firestore: {ordered}, user}, props) => ({
        libro : ordered.libro && ordered.libro[0],
        user: user
    }),{searchUser})
)(LoanBook)