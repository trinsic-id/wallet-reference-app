import axios from 'axios'
import React, { Component } from 'react'
import App from '../Components/App'
import AppContext from './Context'

export default class ContextProvider extends Component {
    constructor(props) {
        super(props)

        this.actions = {
            getWallets: this.getWallets,
            handleBackdrop: this.handleBackdrop,
            getCredentials: this.getCredentials,
        }

        this.state = {
            wallets: [],
            backdrop: false,
            credentials: [],
            connections: []
        }
    }

    getCredentials = async (walletId) => {
        this.handleBackdrop(true)
        const creds = await axios.get(`http://localhost:8000/api/listCredentials/${walletId}`)
        const connections = await axios.get(`http://localhost:8000/api/listConnections/${walletId}`)
        let credentialsWithConnections = creds.data.filter(cred => cred.state === 'Issued')
        for(let cred of credentialsWithConnections) {
            cred['connectionName'] = connections.data.filter(connection => connection.connectionId === cred.connectionId)[0].name
        }
        console.log('context',credentialsWithConnections)
        this.setState({
            ...this.state,
            credentials: credentialsWithConnections,
            connections: connections.data
        })
        this.handleBackdrop(false)
    }

    getWallets = async () => {
        this.handleBackdrop(true)
        const wallets = await axios.get('http://localhost:8000/api/listWallets/')
        this.setState({
            ...this.state,
            wallets: wallets.data
        })
        this.handleBackdrop(false)
    }

    handleBackdrop = (state) => {
        this.setState({
            ...this.state,
            backdrop: state
        })
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                    <App />
            </AppContext.Provider>
        )
    }
}
