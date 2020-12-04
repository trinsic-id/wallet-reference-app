import React, { useContext, useEffect, useState } from 'react'
import { Typography, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, Paper } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AppContext from '../Context/Context'
import axios from 'axios'
import CredentialDetailsDialog from './CredentialDetailsDialog'
import useInterval from './useInterval'

export default function CredentialList(props) {

    const context = useContext(AppContext)

    const [credentials, setCredentials] = useState([])

    const [connections, setConnections] = useState([])

    const [currentCredential, setCurrentCredential] = useState({
        schemaId: '1',
        values: {

        }
    })

    const [credentialDialogOpen, setCredentialDialogOpen] = useState(false)

    const handleCredentialDialogClose = () => {
        setCredentialDialogOpen(false)
    }

    const showDetails = async (e, credentialId) => {
        const credential = credentials.filter(cred => cred.credentialId === credentialId)[0]
        setCurrentCredential(credential)
        setCredentialDialogOpen(true)
    }

    const getCredentials = async (walletId) => {
        const creds = await axios.get(`/api/listCredentials/${walletId}`)
        const connections = await axios.get(`/api/listConnections/${walletId}`)
        let credentialsWithConnections = creds.data.filter(cred => cred.state === 'Issued')
        for(let cred of credentialsWithConnections) {
            cred['connectionName'] = connections.data.filter(connection => connection.connectionId === cred.connectionId)[0].name
        }
        setCredentials(credentialsWithConnections)
        setConnections(connections.data)
    }


    useInterval(() => {
        getCredentials(props.walletId)
    }, 2000)

    return (
        <React.Fragment>
            <Typography align='center' variant='h6'>
                Credentials
            </Typography>
            <TableContainer style={{marginTop: '0.5rem'}} component={Paper}>
                <Table>
                    <TableBody>
                        {credentials.map(credential => (
                            <TableRow key={credential.credentialId}>
                                <TableCell>
                                    <Typography variant='body1' color='primary'>
                                        {credential.schemaId.split(':')[2]}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1' style={{color: '#5F7186'}}>
                                        {credential.connectionName}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton color='primary' onClick={e => showDetails(e, credential.credentialId)}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CredentialDetailsDialog credential={currentCredential} open={credentialDialogOpen} close={handleCredentialDialogClose} />
        </React.Fragment>
    )
}
