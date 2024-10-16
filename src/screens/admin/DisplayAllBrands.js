import MaterialTable from "@material-table/core";
import { brandStyles } from "./BrandCss";
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TitleComponent from "../../components/admin/TitleComponent";
import { Grid,TextField,Avatar } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function DisplayAllBrands(){
    var classes=brandStyles()
    var navigate=useNavigate()

    const [brandData,setBrandData]=useState([])
    const [open,setOpen]=useState(false)
    const [brandid,setBrandId]=useState('')

    const [brands,setBrands]=useState('')
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showbtn,setShowBtn]=useState(false)
    const handlePicture=(event)=>{
      
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        
        setShowBtn(true)
    }

    const handleCancel=()=>{
      setPicture({file:tempPicture,bytes:''})

      setShowBtn(false)
 
     }

    const handleError=(label,msg)=>{
     setError((prev)=>({...prev,[label]:msg}))

    }

    const handleEditData=async()=>{

      var submit=true

      if(brands.length==0)
      {
          handleError('brands','Pls input brand name ')
          submit=false
      }
      
      if(submit)
      {  

      var body ={brandid:brandid,brandname:brands}
      var result=await postData('brand/edit_brand_data',body)
      
      if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }


      fetchAllBrands() 

      }
      
 
     }


     const handleEditPicture=async()=>{
      var  formData=new FormData()
      formData.append('brandid',brandid)
      formData.append('picture',picture.bytes)
      var result=await postData('brand/edit_brand_picture',formData)
      
      
      if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }
      
      fetchAllBrands() 
 
     }

     const handleDelete=async(rowData)=>{
                
              Swal.fire({
                title: "Do you want to delete brand",
                toast:true,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "delete",
                denyButtonText: `Don't delete`
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  var body ={brandid:rowData.brandid}
                  var result=await postData('brand/delete_brand_data',body)

                  if(result.status)
                  {Swal.fire({toast:true,title:"deleted", icon:"success"});
                  fetchAllBrands()}
 
                  else
                  Swal.fire({toast:true,title:"Fail to delete Record", icon:"error"});
                } else if (result.isDenied) {
                  Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
                }
              
              });
              

            }
     



    const fetchAllBrands=async()=>{
    var result=await getData('brand/display_all_brand')
    console.log('DAAATTAAA',result.data)
    if(result.status)
    { setBrandData(result.data)}
    
    }
    useEffect(function(){
   fetchAllBrands()

    },[])


    const handleClose=()=>{
      setOpen(false)


    }


    const handleOpen=(rowData)=>{
      setOpen(true)
      setBrandId(rowData.brandid)
      setBrands(rowData.brandname)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

   const showBrandForm=()=>{
   return(
    <Dialog
    open={open}
    onClose={handleClose} 
    maxWidth={"md"}
    >
     
      <DialogContent>
      <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TitleComponent title="Edit Brand Data" logo="logo.png" />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={brands} onFocus={()=>handleError('brands',null)} error={error.brands} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.brands}</span>} onChange={(event)=>setBrands(event.target.value)} label="Brand Name" fullWidth />
                </Grid>

                <Grid item xs={6}>
                  {showbtn?<div style={{display:'flex',width:'100%',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{display:'flex',width:'100%',height:100,justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>
                    <Button variant="contained"  component="label" fullWidth>
                        Set New Picture
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}
                   
                    </div>}

                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                    <Avatar alt="Remy Sharp" src={picture.file} variant="rounded"  style={{width:100,height:100}} />
                </Grid>
                


            </Grid>
        </div>
        
      </DialogContent>
      <DialogActions>
      <Button onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
   )



   }




    function showBrands() {
        return (
          <MaterialTable
            title="Main Brands"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand Type', field: 'brandname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></> },
               
            ]}
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={brandData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brands',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'delete Brands',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
               icon: 'add',
               tooltip: 'Add new brand',
               isFreeAction: true,
               onClick: (event) => navigate('/admindashboard/brand')
              }
            ]}
          />
        )
      }

  return(<div className={classes.root}>
    <div className={classes.boxdisplay}>
    {showBrands()}
  </div>
  {showBrandForm()}
  </div>
   )

}