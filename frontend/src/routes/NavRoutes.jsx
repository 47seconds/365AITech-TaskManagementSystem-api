import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, Navigate} from 'react-router-dom';
import App from '../App';
import {Home, SignIn, SignUp} from '../pages';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='' element={<Navigate to='/home' replace/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='signin' element={<SignIn/>}/>
            <Route path='signup' element={<SignUp/>}/>
        </Route>
    )
)
export default router
