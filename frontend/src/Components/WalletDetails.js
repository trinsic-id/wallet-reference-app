import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AppContext from '../Context/Context'
import { Grid, makeStyles, Typography, Paper, Link, IconButton } from '@material-ui/core'
import axios from 'axios'
import RefreshIcon from '@material-ui/icons/Refresh'
import WalletActions from './WalletActions'
import AcceptConnection from './AcceptConnection'
import CredentialList from './CredentialList'

const useStyles = makeStyles(theme => ({
    section: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    }
}))

export default function WalletDetails() {
    const classes = useStyles()
    const { id } = useParams()
    const context = useContext(AppContext)
    const history = useHistory()

    const [currentWallet, setCurrentWallet] = useState({
        walletId: '1',
        ownerName: 'Name'
    })

    useEffect(() => {
        context.handleBackdrop(true)
        fetchData()
        setTimeout(() => {
            context.handleBackdrop(false)
        }, 3000)
    }, [])

    const fetchData = async () => {
        const wallets = await axios.get('/api/listWallets/')
        const wal = wallets.data.filter(wallet => wallet.walletId === id)[0]
        setCurrentWallet(wal)
    }

    const refresh = async () => {
        context.handleBackdrop(true)
        context.handleBackdrop(false)
    }

    return (
        <React.Fragment>
            <Typography onClick={e => history.push('/')} variant='body1' color='primary' style={{position: 'absolute'}}>
                <Link href='#'>Back To Home</Link>
            </Typography>
            <Grid container spacing={0} justify='center' >
                <Grid item lg={8}>
                    <Paper className={classes.section}>
                        <Typography align='center' variant='h5'>
                            {currentWallet.name}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <WalletActions walletId={id} />
                                <AcceptConnection walletId={id} />
                            </Grid>
                            <Grid item md={6}>
                                <CredentialList walletId={id} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}