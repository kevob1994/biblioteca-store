import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import searchUserReducer from './reducers/searchUserReducer'

const firebaseConfig = {
    apiKey: "AIzaSyC159KBsdwky2ESUmLm2BB7VBblEeE88L0",
    authDomain: "bibliostore-96d7a.firebaseapp.com",
    databaseURL: "https://bibliostore-96d7a.firebaseio.com",
    projectId: "bibliostore-96d7a",
    storageBucket: "bibliostore-96d7a.appspot.com",
    messagingSenderId: "763068264160",
    appId: "1:763068264160:web:af9c24190bbe54745cea85",
    measurementId: "G-WXJLD5MJ7Q"
}

firebase.initializeApp(firebaseConfig)

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    user: searchUserReducer
})

const initialState = {}

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;