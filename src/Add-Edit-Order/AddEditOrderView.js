import { Container } from "@mui/system";
import FormCreateOrder from "./FormCreateOrder";
import FormEditOrder from "./FormEditOrder";
import TableProductsAvailable from "./TableProductsAvailable";

export default function AddEditOrderView() {
    const path = window.location.pathname.split("/")[2];
    return(
        <section>
            <div className="padded titlebgcolor">
                <Container maxWidth="sm" style={{"text-align": "center"}}>
                    {path !== ":id"?<h1>Edit Order</h1>:<h1>Add Order</h1>}
                </Container>
            </div>
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"text-align": "center", "background-color":"#f5f5f5"}}>
                    {path !== ":id"?
                        <FormEditOrder/>
                    :<FormCreateOrder/>}
                    
                </Container>
            </div>
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"text-align": "center"}}>
                    <TableProductsAvailable/>   
                </Container>
            </div>
        </section>
    );
}