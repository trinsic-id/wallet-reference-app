import React, { useContext, useState } from 'react'
import { Typography, TableContainer, TableBody, Table, TableRow, TableCell, Paper, IconButton } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CredentialDialog from './CredentialDialog'
import AppContext from '../Context/Context'
import axios from 'axios'
import CredentialVerificationDialog from './CredentialVerificationDialog'
import useInterval from './useInterval'


export default function WalletActions(props) {

    const context = useContext(AppContext)

    const [availableCredentials, setAvailableCredentials] = useState({
        availableCredentials: []
    })

    const [credentialActions, setCredentialActions] = useState([])

    const [currentVerification, setCurrentVerification] = useState({
        policy: {
            name: ''
        }
    })

    const [currentAction, setCurrentAction] = useState({
        schemaId: '',
        values: {
            'First Name': 'Trinsic'
        }
    })

    const [openActionDialog, setOpenActionDialog] = useState(false)

    const [openVerificationDialog, setOpenVerificationDialog] = useState(false)

    const [verificationActions, setVerificationActions] = useState([])

    const getActions = async () => {
        const actions = await axios.get(`/api/listCredentials/${props.walletId}`)
        const verifications = await axios.get(`/api/listVerifications/${props.walletId}`)
        setVerificationActions(verifications.data.filter(verification => verification.state === 'Requested'))
        setCredentialActions(actions.data.filter(cred => cred.state === 'Offered'))        
    }

    const getAvailableCredentials = async (verificationId) => {
        const possibleCredentials = await axios.get(`/api/listAvailableCredentials/${props.walletId}/${verificationId}`)
        setAvailableCredentials(possibleCredentials.data[0])
    }

    const handleOpenActionDialog = (action) => {
        setCurrentAction(action)
        setOpenActionDialog(true)
    }

    const handleCloseActionDialog = () => {
        setOpenActionDialog(false)
    }

    const handleCredentialAccept = async () => {
        context.handleBackdrop(true)
        handleCloseActionDialog()
        const response = await axios.post(`/api/acceptCredential/${props.walletId}/${currentAction.credentialId}/`)
        console.log('acceptance', response.data)
        let actions = credentialActions
        actions = actions.filter(action => action.credentialId != currentAction.credentialId)
        setCredentialActions(actions)
        await context.getCredentials(props.walletId)
        context.handleBackdrop(false)
    }

    const handleVerificationCloseDialog = () => {
        setOpenVerificationDialog(false)
    }

    const handleVerificationOpenDialog = async (verification) => {
        context.handleBackdrop(true)
        await getAvailableCredentials(verification.verificationId)
        setCurrentVerification(verification)
        setOpenVerificationDialog(true)
        context.handleBackdrop(false)
    }

    const proveVerificationRequest = async (verificationId) => {
        handleVerificationCloseDialog()
        const response = await axios.post(`/api/submitVerification/${props.walletId}/${verificationId}`)
        console.log(response)
    }

    useInterval(() => {
        getActions()
    }, 2000)

    return (
        <React.Fragment>
            <Typography align='center' variant='h6'>
                Actions
            </Typography>
            <TableContainer style={{marginTop: '0.5rem'}} component={Paper}>
                <Table>
                    <TableBody>
                    {credentialActions.map(credential => (
                        <TableRow key={credential.credentialId}>
                            <TableCell>
                                <Typography variant='body1' color='primary'>
                                    Credential Offer
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='body1' style={{color: '#5F7186'}}>
                                    {credential.schemaId.split(':')[2]}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpenActionDialog(credential)} color='primary'>
                                    <ChevronRightIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {verificationActions.map(verification => (
                        <TableRow key={verification.verificationId}>
                            <TableCell>
                                <Typography variant='body1' color='primary'>
                                    Credential Verification Request
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='body1' style={{color: '#5F7186'}}>
                                    {verification.policy.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleVerificationOpenDialog(verification)} color='primary'>
                                    <ChevronRightIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CredentialDialog open={openActionDialog} close={handleCloseActionDialog} currentAction={currentAction} accept={handleCredentialAccept} />
            <CredentialVerificationDialog open={openVerificationDialog} close={handleVerificationCloseDialog} currentAction={currentVerification} availableCredentials={availableCredentials} prove={proveVerificationRequest} />
        </React.Fragment>
    )
}
