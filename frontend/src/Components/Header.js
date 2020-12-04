import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import TrinsicLogo from '../Images/trinsicLogo.png'
import wallet from '../Images/wallet.svg'

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
        color: 'white'
    },
    logo: {
        height: '2.5rem'
    }
}))

export default function Header() {
    const classes = useStyles()

    return (
        <React.Fragment>
            <AppBar position='fixed'>
                <Toolbar>
                    <img className={classes.logo} src={wallet} style={{marginRight: '0.5rem'}} alt='wallet logo' />
                    <Typography variant='h6' className={classes.title}>
                        Wallet Reference App
                    </Typography>
                    <a href='https://trinsic.id' target='_blank' rel='noreferrer' >
                        <img className={classes.logo} src={TrinsicLogo} alt='trinsic logo' />
                    </a>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </React.Fragment>
    )
}
