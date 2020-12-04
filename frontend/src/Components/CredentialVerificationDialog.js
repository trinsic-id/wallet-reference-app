import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText } from '@material-ui/core'

export default function CredentialVerificationDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>Verification - {props.currentAction.policy.name}</DialogTitle>
            <DialogContent>
                {!props.availableCredentials.availableCredentials.length ?
                <DialogContentText>You have no current credentials that fulfill the request.</DialogContentText>
                :
                <DialogContentText>The verification will be fulfilled by automatically selecting a credential in your wallet that meets all the criteria of the request.</DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={props.close}>Cancel</Button>
                {!props.availableCredentials.availableCredentials.length ?
                null
                :
                <Button variant='contained' color='primary' onClick={() => props.prove(props.currentAction.verificationId)}>Verify</Button>
                }
            </DialogActions>
        </Dialog>
    )
}