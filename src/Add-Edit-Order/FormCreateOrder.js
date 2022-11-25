import {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { url } from '../constants/url';
// import { useForm, Controller } from "react-hook-form";


export default function FormCreateOrder(){
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
      
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
    function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('-') + "T00:00:00";
    }

    // dayjs('2014-08-18T21:11:54')
    const [dateString] = useState(formatDate(new Date()));
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const [productSelected, setProductSelected] = useState({});
    const [quantity, setquantity] = useState(0);
    const [listProduct, setlistProduct] = useState([]);
    const [orderNumber, setorderNumber] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        setquantity(0);
        setProductSelected({});
    };

    const handleSelectChange = (e) => {

        fetch(`${url}/product/${e.target.value}`).then(res => res.json()).then((result) => {
            setProductSelected(result)
        })

        
        
    };

    const handleChangeQuantity = (e) =>{
        setquantity(e.target.value);
    };
    // let productadd = orderSelected.products;
    // productadd.push()
    const btnConfirmAndSave = () => {
        

        if (productSelected !== {}){


            const dataOrderAdd = {
                numOrderD: orderNumber,
                dateD: dateString,
                numProductsD: 1,
                finalPriceD: productSelected.unitPriceD * quantity,
                products: [{
                    productId : productSelected.idProductD,
                    stateOrder: "Pending",
                    quantityBuy: quantity,
                    totalBuy: productSelected.unitPriceD * quantity
                }]
            };
            const productQuantityAvailableRemain = listProduct.filter((product) => 
            product.idProductD == productSelected.idProductD)[0].quantityD - quantity;
            
            if (productQuantityAvailableRemain >= 0){
                
                const dataProductUpdate = {
                    idProductD: productSelected.idProductD,
                    nameD: productSelected.nameD,
                    unitPriceD: productSelected.unitPriceD,
                    quantityD: productQuantityAvailableRemain
                }
    
                Promise.all([
                    fetch(`${url}/order/add`,{
                        method:"POST", 
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify(dataOrderAdd)
                    }).then(res => res.json()),
                    fetch(`${url}/product/update`,{
                        method:"PUT", 
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify(dataProductUpdate)
                    }).then(res => res.json())
                ])
                .then(([res1, res2]) => {
                    setOpen(false);
                })
            }
            else{
                alert("No hay productos");
            }

            
            
        }
        
    };

    useEffect(()=>{
        // CARGAR API PARA OBTENER INFORMACIÓN DE ORDEN
        Promise.all([
            fetch(`${url}/product/all`).then(res => res.json())
    ]).then(([res1]) =>{
        setlistProduct(res1)
    })
        /**
         * .then(res=> res.json()).then(result=>{
            setorderSelected(result)})
         */
    },[])


    return (
        <section>
            <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
                Order #
            </Grid>
            <Grid item xs={8}>
            {/* <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} />}
            /> */}
            <TextField
                id="standard-basic"
                variant="standard"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: '0' }}
                onChange= {(e) => setorderNumber(e.target.value)}
                />
                
            </Grid>
            <Grid item xs={4}>
              Date
            </Grid>
            <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                    label="Current Date"
                    disabled
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              #Products
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    label="# Products"
                    type="number"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ min: '0' }}
                />
            </Grid>
            <Grid item xs={4}>
              Final Price
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    label="Final Price"
                    type="number"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ min: '0' }}
                    />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" size="large" onClick={handleOpen}>Add new Product</Button>
            </Grid>
          </Grid>
        </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Agregar Producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            Product
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productSelected.idProductD}
                                label="Age"
                                onChange={(e)=>handleSelectChange(e)}
                                fullWidth
                            >
                                {listProduct.map((item,key)=>
                                <MenuItem value={item.idProductD}>{item.nameD}</MenuItem>
                                )}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            Quantity
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