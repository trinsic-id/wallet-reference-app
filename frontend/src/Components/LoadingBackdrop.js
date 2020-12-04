import React, { useContext } from 'react'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import AppContext from '../Context/Context'

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))

export default function LoadingBackdrop() {
    const classes = useStyles()
    const context = useContext(AppContext)

    return (
        <Backdrop className={classes.backdrop} open={context.backdrop}>
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}
