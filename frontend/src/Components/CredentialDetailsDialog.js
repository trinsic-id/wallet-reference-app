import React from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton, TableContainer, Table, TableBody, TableRow, TableCell, Paper, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function CredentialDetailsDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close}>
            <IconButton style={{position: 'absolute', right: '0', margin: '0.25rem'}} onClick={props.close}>
                <CloseIcon />
            </IconButton>
            <DialogTitle>
                {props.credential.schemaId.split(':')[2]}
                <Typography variant='subtitle2' style={{color: '#5F7186'}}>
                    {props.credential.connectionName}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TableContainer style={{backgroundColor: '#F9FAFB', marginBottom: '1rem'}} component={Paper}>
                    <Table size='small'>
                        <TableBody>
                            {Object.entries(props.credential.values).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>
                                        {key}
                                    </TableCell>
                                    <TableCell>
                                        {value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    )
}
