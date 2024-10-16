import { Box, Button, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import Header from "./Header";
import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import { serverURL } from "../../services/FetchNodeServices";

export default function DisplayOrder(props){

    var navigate=useNavigate()
    const [orderData,setOrderData]=useState([])
    const [orderdetail,setOrderDetail]=useState([])
    const [open,setOpen]=useState(false)

    const fetchAllOrders=async()=>{
      var result=await getData('users/display_order')
      console.log('DAAATTAAA',result.data)
      if(result.status)
      { setOrderData(result.data)}
      
      }
      useEffect(function(){
     fetchAllOrders()
  
      },[])

      
    const fetchAllOrderDetails=async(orderid)=>{
      
      var result=await postData('users/display_orderdetails',{orderid:orderid})
      
      if(result.status)
      { setOrderDetail(result.data)}
      
      }
      
  
  
    const handleOpen=(rowData)=>{
      setOpen(true)
      fetchAllOrderDetails(rowData.orderid)
      
    }

    const handleClose=()=>{
      setOpen(false)
  
    }


    function SimpleAction() {
        return (
          <MaterialTable
            title="My Orders"
            columns={[
              { title: 'Order id', field: 'orderid' },
              { title: 'Order date', field: 'orderdate' },
              { title: 'User id', field: 'userid' },
              { title: 'Payment id', field: 'paymentid' },
              { title: 'Payment status', field: 'paymentstatus' },
             
          
            ]}
            data={orderData}
            actions={[
              {
                icon: 'link',
                tooltip: 'Display Product Details',
                onClick: (e, rowData) => handleOpen(rowData),
              }
            ]} 
      
          />
        )
      }


      function showOrderDetail() {
        return (
          <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
            <DialogContent>
              <MaterialTable
            title="My Order Details"
            columns={[
              { title: 'Transaction id', field: 'transactionid' },
              { title: 'Order id', field: 'orderid' },
              { title: 'ProductDetail id', field: 'productdetailid' },
              { title: 'Price', field: 'price' },
              { title: 'Offer Price', field: 'offerprice' },
              { title: 'Qty', field: 'qty' },
              { title: 'delivery Status', field: 'deliverystatus' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></> },
     
            ]}
            data={orderdetail}
          />
         </DialogContent>
         <DialogActions>
          <Button onClick={handleClose }>Close</Button>
         </DialogActions>
         </Dialog>
        )
      }





    return(
        <Box>
            <Header/>
            <Grid item xs={12}>
                <Grid style={{width:"100%",display:'flex',justifyContent:'center',alignItems:'center',marginTop:60}} >
                    <div style={{width:'80%'}}>
                    {SimpleAction()}

                    </div>
                    {showOrderDetail()}
                </Grid>

            </Grid>
        </Box>
    )
}