import React, { useContext, useState } from 'react'
import { Typography, TextField, Box, Button } from '@material-ui/core'
import AppContext from '../Context/Context'
import axios from 'axios'
import SuccessSnackbar from './SuccessSnackbar'

export default function AcceptConnection(props) {

    const context = useContext(AppContext)

    const [connectionUrl, setConnectionUrl] = useState('')

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [urlError, setUrlError] = useState({
        error: false,
        message: ''
    })

    const handleAcceptConnection = async () => {
        context.handleBackdrop(true)
        try {
            const response = await axios.post('/api/acceptConnection/', {
                inviteUrl: connectionUrl,
                walletId: props.walletId
            })
            if(response.status === 200) {
                setConnectionUrl('')
                setUrlError({
                    error: false,
                    message: ''
                })
                setOpenSnackbar(true)
            }
        } catch(err) {
            setUrlError({
                error: true,
                message: 'Invalid URL'
            })
        }
        context.handleBackdrop(false)
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    return (
        <React.Fragment>
            <Typography style={{marginBottom: '0.5rem', marginTop: '1rem'}} align='center' variant='h6'>
                Accept Connection
            </Typography>
            <form>
                <TextField error={urlError.error} helperText={urlError.message} onChange={e => setConnectionUrl(e.target.value)} value={connectionUrl} required fullWidth variant='outlined' label='Invite URL' />
                <Box style={{marginTop: '0.5rem'}} display='flex' justifyContent='center' alignItems='center' >
                    <Button onClick={handleAcceptConnection} variant='contained' color='primary'>Accept</Button>
                </Box>
            </form>
            <SuccessSnackbar open={openSnackbar} message='Connection Successful!' close={handleSnackbarClose} />
        </React.Fragment>
    )
}
