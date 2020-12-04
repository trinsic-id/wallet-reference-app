import React, { useContext, useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import AppContext from '../Context/Context'

export default function CreateWallet() {
    const context = useContext(AppContext)
    const [walletName, setWalletName] = useState('')
    const [walletId, setWalletId] = useState('')

    const handleSubmit = async () => {
        context.handleBackdrop(true)
        const wallet = {
            ownerName: walletName === '' ? null : walletName,
            walletId: walletId === '' ? null : walletId
        }
        await axios.post('http://localhost:8000/api/createWallet/', wallet)
        context.getWallets()
        context.handleBackdrop(false)
    }

    return (
        <React.Fragment>
            <Typography style={{marginBottom: '1rem'}} variant='h5' align='center'>
                Create a New Wallet
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <TextField helperText='Can be blank' fullWidth label='Wallet ID' variant='outlined' value={walletId} onChange={e => setWalletId(e.target.value)} />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField helperText='Can be blank' fullWidth label='Wallet Name' variant='outlined' value={walletName} onChange={e => setWalletName(e.target.value)} />
                    </Grid>
                    <Grid item lg={12}>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button onClick={handleSubmit} variant='contained' color='primary'>Create</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}
