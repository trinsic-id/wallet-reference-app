import React, { useContext } from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import CreateWallet from './CreateWallet'
import ListWallets from './ListWallets'
import AppContext from '../Context/Context'

const useStyles = makeStyles(theme => ({
    section: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    }
}))

export default function Wallet() {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Grid container spacing={1} justify='center'>
                <Grid item lg={3}>
                    <Paper className={classes.section}>
                        <CreateWallet />
                    </Paper>
                </Grid>
                <Grid item lg={6}>
                    <Paper className={classes.section}>
                        <ListWallets />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
