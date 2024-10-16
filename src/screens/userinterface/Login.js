import { Grid } from "@mui/material";

import LoginImage from "../../components/userinterface/LoginImage";

import { LoginStyles } from '../../components/userinterface/LoginCss';
import LoginOtp from "../../components/userinterface/LoginOtp";

import { useNavigate} from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../components/userinterface/Header";

export default function Login()
{
    const classes=LoginStyles()
    const navigate=useNavigate()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    

    return(<Grid  >
        
        <Header/>
        <Grid container={2} >
       <Grid  md={6} className={classes.image} >
       {!matches?<div >
       <LoginImage/>
        </div>:<div></div>}

        </Grid >

        <Grid xs={12} md={6} className={classes.onetextbox} >
          
        {LoginOtp()}
        </Grid>
            

        </Grid>
        
    </Grid>)


}