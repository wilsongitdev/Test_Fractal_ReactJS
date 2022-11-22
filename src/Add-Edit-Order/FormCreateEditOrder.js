import * as React from 'react';
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



export default function FormCreateEditOrder(){
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
        console.log(padTo2Digits(date.getDate()))
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('-') + "T00:00:00";
    }
    console.log(formatDate((new Date())))
    // dayjs('2014-08-18T21:11:54')
    const [value, setValue] = React.useState(formatDate(new Date()));
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <section>
            <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
                Order #
            </Grid>
            <Grid item xs={8}>
            
            <TextField
                id="standard-basic"
                variant="standard"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: '0' }}
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
                    value={value}
                    onChange={handleChange}
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
                    Text in a modal
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
                                value={0}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Bread</MenuItem>
                                <MenuItem value={1}>Apple</MenuItem>
                                <MenuItem value={2}>Banana</MenuItem>
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
                            />
                        </Grid>
                    </Grid>

                    </Typography>
                    <Typography>
                    <Button variant="contained" color="success" fullWidth style={{"margin-top": "10px"}} onClick={handleClose}>Confirm and Save</Button>
                    </Typography>
                    
                </Box>
                </Modal>
        </section>
        
      );
}