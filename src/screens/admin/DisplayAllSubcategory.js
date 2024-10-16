import MaterialTable from "@material-table/core";
import { subStyles } from "./SubCategoryCss";
import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "../../services/FetchNodeServices";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";
import TitleComponent from "../../components/admin/TitleComponent";
import { Grid,TextField,Avatar } from "@mui/material";
import Swal from "sweetalert2";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"


export default function DisplayAllSubcategory(){
    var classes=subStyles()
    var navigate=useNavigate()

    const [subcategoryData,setSubcategoryData]=useState([])
    const [open,setOpen]=useState(false)
    const [subcategoryid,setSubcategoryId]=useState('')
    const [categoryId,setCategoryId]=useState('')

    const [subcategory,setSubcategory]=useState('')
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showbtn,setShowBtn]=useState(false)
    const [categorylist,setCategoryList]=useState([])
    const fetchAllCategory=async()=>{
      var result=await getData('category/display_all_category')
      
      if(result.status)
      { setCategoryList(result.data)}
      
      }
      useEffect(function(){fetchAllCategory()},[])

      const fillAllCategory=()=>{
        return categorylist.map((item)=>{
  
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
      }  
    

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
      
      if(categoryId.length==0)
      {
          handleError('subcategory','Pls input category id ')
          submit=false
      }

      if(subcategory.length==0)
      {
          handleError('subcategory','Pls input category name ')
          submit=false
      }
      
      if(submit)
      {  

      var body ={categoryid:categoryId,subcategoryid:subcategoryid,subcategoryname:subcategory}
      var result=await postData('subcategory/edit_subcategory_data',body)
      
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


      fetchAllSubcategory() 

      }
      
 
     }


     const handleEditPicture=async()=>{
      var  formData=new FormData()
      
      formData.append('subcategoryid',subcategoryid)
      formData.append('picture',picture.bytes)
      var result=await postData('subcategory/edit_subcategory_picture',formData)
      
      
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
      
      fetchAllSubcategory() 
 
     }

     const handleDelete=async(rowData)=>{
                
              Swal.fire({
                title: "Do you want to delete subcategory",
                toast:true,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "delete",
                denyButtonText: `Don't delete`
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                
                  var body ={subcategoryid:rowData.subcategoryid}
                  var result=await postData('subcategory/delete_subcategory_data',body)

                  if(result.status)
                  {Swal.fire({toast:true,title:"deleted", icon:"success"});
                  fetchAllSubcategory()}
 
                  else
                  Swal.fire({toast:true,title:"Fail to delete Record", icon:"error"});
                } else if (result.isDenied) {
                  Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
                }
              
              });
              

            }
     



    const fetchAllSubcategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    
    if(result.status)
    { setSubcategoryData(result.data)}
    
    }
    useEffect(function(){
   fetchAllSubcategory()

    },[])

    

    
  

    const handleClose=()=>{
      setOpen(false)


    }


    const handleOpen=(rowData)=>{
      setOpen(true)
      setCategoryId(rowData.categoryid)
      setSubcategoryId(rowData.subcategoryid)
      setSubcategory(rowData.subcategoryname)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

   const showSubcategoryForm=()=>{
   return(
    <Dialog
    open={open}
    onClose={handleClose} 
    maxWidth={"lg"}
    >
     
      <DialogContent>
      <div className={classes.displaybox}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TitleComponent title="Edit Subcategory Data" logo="logo.png" />
                </Grid>

                <Grid item xs={12}> 
                 
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                  label="Category" value={categoryId}
                  onChange={(event)=>setCategoryId(event.target.value)}>
                    {fillAllCategory()}

                  </Select>
               </FormControl> 
                  

               </Grid>

                <Grid item xs={12}>
                    <TextField value={subcategory} onFocus={()=>handleError('subcategory',null)} error={error.subcategory} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.subcategory}</span>} onChange={(event)=>setSubcategory(event.target.value)} label="Subcategory Name" fullWidth />
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




    function showSubcategory() {
        return (
          <MaterialTable
            title="Main Subcategory"
            columns={[
              { title: 'Category ',  field:  'categoryname'  },
              { title: 'Subcategory Id', field: 'subcategoryid' },
              { title: 'Subcategory Type', field: 'subcategoryname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></> },
               
            ]}
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={subcategoryData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Subcategory',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'delete subcategory',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
               icon: 'add',
               tooltip: 'Add new subcategory',
               isFreeAction: true,
               onClick: (event) => navigate('/admindashboard/subcategory')
              }
            ]}
          />
        )
      }

  return(<div className={classes.root}>
    <div className={classes.boxdisplay}>
    {showSubcategory()}
  </div>
  {showSubcategoryForm()}
  </div>
   )
 

}