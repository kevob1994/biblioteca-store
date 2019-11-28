import React from 'react';

const CardSubscriber = ({student}) => {
    console.log(student)
    return (
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">
                Datos Solicitante
            </h3>
            <div className="card-body">
                <p className="font-weight-bold">
                    Nombre: {''}
                    <span className="font-weight-normal">{student.nombre}</span>
                </p>
                <p className="font-weight-bold">
                    Codigo: {''}
                    <span className="font-weight-normal">{student.codigo}</span>
                </p>
                <p className="font-weight-bold">
                    Carrera: {''}
                    <span className="font-weight-normal">{student.carrera}</span>
                </p>
            </div>
        </div>
    );
}
 
export default CardSubscriber;