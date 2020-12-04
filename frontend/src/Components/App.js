import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import Theme from '../Theme/Theme'
import Header from './Header'
import Wallet from './Wallet'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WalletDetails from './WalletDetails'
import LoadingBackdrop from './LoadingBackdrop'

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
          <Header />
          <Switch>
            <Route path='/wallets/:id'>
              <WalletDetails />
            </Route>
            <Route path='/'>
              <Wallet />
            </Route>
          </Switch>
          <LoadingBackdrop />
      </Router>
    </ThemeProvider>
  )
}
