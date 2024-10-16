import { useEffect, useState} from "react";
import Header from "../../components/userinterface/Header";
import PaymentDetails from "../../components/userinterface/PaymentDetails";
import ShowCart from "../../components/userinterface/ShowCart";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AddAddress from "../../components/userinterface/AddAddress";
import AddressComponent from "../../components/userinterface/AddressComponent";
import { postData } from "../../services/FetchNodeServices";
// import Cookies from "js-cookie"

export default function Carts(props){
    const [pageRefresh,setPageRefresh]=useState(false)
    const [status, setStatus] = useState(false)
    const [userAddress,setUserAddress] = useState([])

    // var prd=JSON.parse(Cookies.get('DATA'))
    var products=useSelector(state=>state.data)
    var userData=Object.values(useSelector(state=>state.user))[0]
    var data=Object.values(products)

    const check_user_address = async () => {
      if(userData?.mobileno==undefined)
      { 
        setStatus(false)
      }
      else{
        var result = await postData('users/check_user_address', { mobileno:userData?.mobileno })
        if (result.status == false) 
        {  
            setStatus(true)
           
        }
        else 
        { 
            setStatus(false)
            setUserAddress(result.data)
        }
    }
    }

    useEffect(function(){
        check_user_address()
    },[userData?.mobileno,pageRefresh])



    
    return(
        <div>
            <Header/>
            <div style={{padding:5,margin:10,width:'95%',display:'flex',justifyContent:'center'}} >
               <Grid   container spacing={2}>
                <Grid item xs={12} md={8}>
               <div style={{margin:10,display:'flex'}} >
                       <AddressComponent userAddress={userAddress} userData={userData} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}  status={status} setStatus={setStatus}/>
                    </div>
                
                <div style={{margin:10,display:'flex'}} >
                    
                    <ShowCart pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={data} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                <div style={{margin:10}} ><PaymentDetails userData={userData} userAddress={userAddress} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={products}/></div>
                </Grid>
                </Grid>
            
        </div>
        <AddAddress mobileno={userData?.mobileno}  userAddress={userAddress} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} status={status} setStatus={setStatus} />

        </div>
    )
}