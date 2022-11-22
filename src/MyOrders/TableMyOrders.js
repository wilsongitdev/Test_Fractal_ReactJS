import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';


  
function TableMyOrders(){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    function createData(id, number_order, date, products, finalprice) {
        return { id, number_order, date, products, finalprice };
    }
    const date = new Date();
    const string_date = date.getDate() + "/" + date.getMonth()+ "/"+ date.getFullYear();
    const [open, setOpen] = React.useState(false);
    const [rows, setrows] = React.useState([
        createData(0, 159, string_date, 24, 40.0),
        createData(1, 237, string_date, 37, 40.3),
        createData(2, 262, string_date, 24, 60.0),
        createData(3, 305, string_date, 67, 44.3),
        createData(4, 356, string_date, 49, 82.9),
    ])
    const [roworder, setroworder] = React.useState(null);

    const handleOpenandsend = (roworder) => {
        setOpen(true);
        setroworder(roworder);
        console.log(roworder);
    };
    const handleClose = () => setOpen(false);

    const deleteorder = (id) => {

        setrows(rows.filter((item) => item.id !== id))
        handleClose();

    }
    return(
        <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell align="center">Order #</TableCell>
                        <TableCell align="center">date</TableCell>
                        <TableCell align="center">#Products</TableCell>
                        <TableCell align="center">Final price</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.number_order}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.products}</TableCell>
                            <TableCell align="right">{row.finalprice}</TableCell>
                            <TableCell align="right">

                                    <Link to={`/add-order/${row.id}`}><Button variant="contained">Edit</Button></Link>

                                    <Button variant="contained" color="error" onClick={()=>handleOpenandsend(row)}>delete</Button>
                                
                            </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link to={`/add-order/:id`}><Button variant="outlined">Add Order</Button></Link>
                
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to delete the order n° {roworder?.id}?
                    </Typography>
                    <Typography>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={() => deleteorder(roworder.id)}>Quitar orden</Button>
                    </Typography>
                    
                </Box>
                </Modal>
        </section>
        
        
    );
}
export default TableMyOrders;