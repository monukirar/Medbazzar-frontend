import { Grid } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import { LoginStyles } from "./LoginCss";



export default function LoginImage()
{

    const classes=LoginStyles()

    return(<Grid container={1}>
        <Grid>
        <img src={`${serverURL}/images/med.png`} style={{width:550}} />

        </Grid >
        </Grid>
    )}