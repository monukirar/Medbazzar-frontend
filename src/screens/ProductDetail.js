import Header from "../components/userinterface/Header"
import ProductInformation from "../components/userinterface/ProductInformation"
import ProductPicture from "../components/userinterface/ProductPicture"
import { useLocation } from "react-router-dom"
import { Grid } from "@mui/material"
import { useState } from "react"




export default function ProductDetail()
{  var location=useLocation()
   var item=location?.state?.data
   const [pageRefresh,setPageRefresh]=useState(false)
    return(<div>
        <Header/>
        <Grid container  spacing={1} style={{overflow:'hidden'}} >
            <Grid item xs={12} md={6} style={{width:'50%'}}>
             
                <ProductPicture item={item}/>
             
            </Grid>
            <Grid item xs={12} md={6} style={{width:'50%'}}>
          
                <ProductInformation item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
           
            </Grid>
        </Grid>
        </div>
    
    )
}