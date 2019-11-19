import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC159KBsdwky2ESUmLm2BB7VBblEeE88L0",
    authDomain: "bibliostore-96d7a.firebaseapp.com",
    databaseURL: "https://bibliostore-96d7a.firebaseio.com",
    projectId: "bibliostore-96d7a",
    storageBucket: "bibliostore-96d7a.appspot.com",
    messagingSenderId: "763068264160",
    appId: "1:763068264160:web:dddf90b5bbe7614b5cea85",
    measurementId: "G-21VEC9YQEM"
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
    firestore: firestoreReducer // <- needed if using firestore
})

const initialState = {}

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;