import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from './Alert'

export default function SuccessSnackbar(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.close}>
            <Alert onClose={props.close} severity='success'>
                {props.message}
            </Alert>
        </Snackbar>
    )
}
