import React, { useContext, useEffect } from 'react'
import { Typography, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, IconButton, Paper } from '@material-ui/core'
import axios from 'axios'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import AppContext from '../Context/Context'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useHistory } from 'react-router-dom'

export default function ListWallets() {

    const context = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        context.getWallets()
    }, [])

    const deleteWallet = async (walletId) => {
        context.handleBackdrop(true)
        const response = await axios.post('/api/deleteWallet/', { walletId: walletId })
        console.log(response)
        context.getWallets()
        context.handleBackdrop(false)
    }

    return (
        <React.Fragment>
            <Typography variant='h5' align='center'>
                Your Wallets
            </Typography>
            <TableContainer style={{marginTop: '1rem'}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Wallet ID
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {context.wallets.map(wallet => (
                            <TableRow key={wallet.walletId}>
                                <TableCell>
                                    {wallet.walletId}
                                </TableCell>
                                <TableCell>
                                    {wallet.name}
                                </TableCell>
                                <TableCell>
                                    <IconButton color='secondary' onClick={() => deleteWallet(wallet.walletId)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton color='primary' onClick={() => history.push(`/wallets/${wallet.walletId}`)}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
