import { Container } from "@mui/system";
import FormCreateEditOrder from "./FormCreateEditOrder";

export default function AddEditOrderView() {
    return(
        <section>
            <div className="padded titlebgcolor">
                <Container maxWidth="sm" style={{"text-align": "center"}}>
                    <h1>Add/Edit Order</h1>
                </Container>
            </div>
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"text-align": "center", "background-color":"#f5f5f5"}}>
                    <FormCreateEditOrder/>
                </Container>
            </div>
        </section>
    );
}