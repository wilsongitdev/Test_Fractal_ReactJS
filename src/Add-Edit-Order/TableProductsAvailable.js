import {useEffect,useState} from 'react'
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
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
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { url } from '../constants/url';

export default function TableProductsAvailable() {

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

    const [open, setOpen] = useState(false);
    const [roworder, setroworder] = useState(null);
    const handleClose = () => setOpen(false);
    const [listProduct, setlistProduct] = useState([]);
    const [quantity, setquantity] = useState(0);
    const [orderSelected, setorderSelected] = useState({});
    const [stateSelected, setstateSelected] = useState("");
    const [productById, setProductById] = useState([]);

    const handleOpen = () => {
        
        setOpen(true);

    };

    const   handleChangestate = (e) => setstateSelected(e.target.value)
    const deleteorderproduct = () => {

    }

    const handleChangeQuantity = (e) =>{
        setquantity(e.target.value);
    };


    const editOrderProduct = (row) => {
        handleOpen();
        fetch(`${url}/product/${row.idProductD}`).then(res => res.json()).then((result) => {
            setProductById(result)
        })
    }
    const btnConfirmAndSave = () => {

            // get final price;
            let sumPrice = 0;
            let orderfiltered = orderSelected.products;
            orderfiltered.filter((item) => item.productId == productById.idProductD);
            ///

            orderSelected.products.forEach((element) => {
                sumPrice += element.totalBuy;
            })
            sumPrice = sumPrice - orderfiltered.totalBuy + productById.unitPriceD * quantity;

            const dataOrderEditProduct = {
                idOrderD: Number(window.location.pathname.split("/")[2]),
                numOrderD: orderSelected.numOrderD,
                dateD: orderSelected.dateD,
                numProductsD: orderSelected.products.length,
                finalPriceD: sumPrice,
                products: [{
                    productId : productById.idProductD,
                    stateOrder: stateSelected,
                    quantityBuy: Number(quantity),
                    totalBuy: productById.unitPriceD * quantity     
                }]
            }


            Promise.all([
                fetch(`${url}/order/update`,{
                    method:"PUT", 
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(dataOrderEditProduct)
                }).then(res => res.json()),
            ])
            .then(([res1]) => {
                setOpen(false);
            })


    }
    
    useEffect(()=>{
        
        Promise.all([

            fetch(`${url}/order/${window.location.pathname.split("/")[2]}`).then(res => res.json()),
            fetch(`${url}/product/available/all`).then(res => res.json())

        ]).then(([res1 , res2]) =>{
            setorderSelected(res1);
            setlistProduct(res2);
        })
    },[])

  return (
    <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">UnitPrice</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="center">Total Price</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProduct.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.idProductD}
                            </TableCell>
                            <TableCell align="right">{row.nameD}</TableCell>
                            <TableCell align="right">{row.unitPriceD}</TableCell>
                            <TableCell align="right">{row.quantityD}</TableCell>
                            <TableCell align="right">{row.unitPriceD * row.quantityD}</TableCell>
                            <TableCell align="right">

                                    <Button variant="contained" onClick={()=>editOrderProduct(row)}>Edit</Button>

                                    <Button variant="contained" color="error" onClick={()=>console.log("hola")}>delete</Button>
                                
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
                            Eliminar producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to delete the product n° {roworder?.id}?
                    </Typography>
                    <Typography>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={() => deleteorderproduct(roworder.id)}>Quitar orden</Button>
                    </Typography>
                    
                </Box>
                </Modal>

                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            stateOrder
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={stateSelected}
                            onChange={(e) => handleChangestate(e)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            quantityBuy
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                label="Qty required"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ min: '0' }}
                                value={quantity}
                                onChange={(e) => handleChangeQuantity(e)}
                            />
                        </Grid>
                        
                    </Grid>

                    </Typography>
                    <Typography>
                    <Button variant="contained" 
                        color="success" 
                        fullWidth 
                        style={{"margin-top": "10px"}}
                        onClick={btnConfirmAndSave}>Confirm and Save
                    </Button>
                    </Typography>
                    
                </Box>
            </Modal>
        </section>
  );
}
