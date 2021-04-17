import { PromiseProvider } from 'mongoose';
import React, { Component, useContext} from 'react';
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './UserContext'

export default function ProtectedRoute ({children, ...rest}) {
  const user = useContext(UserContext)
  return (
    <>
      <Route {...rest} render={() => (
        user ?
          children :
          <Redirect to='/login' />
        )}
      />
    </>
  )
}