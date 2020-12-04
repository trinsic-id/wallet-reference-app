import React from 'react'
import { Dialog, DialogTitle, DialogContent, TableCell, TableContainer, Table, TableRow, Paper, Button, TableBody, DialogActions, Typography } from '@material-ui/core'

export default function CredentialDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close}>
                <DialogTitle>
                    {props.currentAction.schemaId.split(':')[2]}
                </DialogTitle>
                <DialogContent>
                    <TableContainer style={{backgroundColor: '#F9FAFB'}} component={Paper}>
                        <Table size='small'>
                            <TableBody>
                                {Object.entries(props.currentAction.values).map(([key, value]) => (
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
                <DialogActions>
                    <Button variant='contained' onClick={props.close}>Cancel</Button>
                    <Button variant='contained' onClick={props.accept} autoFocus color='primary'>Accept</Button>
                </DialogActions>
            </Dialog>
    )
}
