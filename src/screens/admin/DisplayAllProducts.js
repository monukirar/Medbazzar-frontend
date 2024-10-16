import MaterialTable from "@material-table/core";
import { productStyles } from "./ProductCss";
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


export default function DisplayAllProducts(){
    var classes=productStyles()
    var navigate=useNavigate()

    
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showbtn,setShowBtn]=useState(false)
    const [open,setOpen]=useState(false)
    const [productId,setProductId]=useState('')
    const [productname,setProductname]=useState('')
    const [description,setDescription]=useState('')
    const [productData,setProductData]=useState([])


    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        {setCategoryList(result.data)}
    }
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })

    }


    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }


    const fetchAllSubCategory=async(cid)=>{
        var  result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status)
        {
            setSubCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllSubCategory()},[])

    const fillAllSubCategory=()=>{
        return  subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


    const fetchAllBrands=async()=>{
        var result=await getData('brand/display_all_brand')
        if(result.status)
        {setBrandList(result.data)}
    }
    useEffect(function(){fetchAllBrands()},[])

    const fillAllBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
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
        
        
        if(productname.length==0)
        {
            handleError('productname','Pls Input Product Name')
            submit=false
        }
        if(description.length==0)
        {
            handleError('description','Pls Input Description')
            submit=false
        }
        
        if(submit)
        {  
  
        var body ={productid:productId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productname:productname,description:description}
        var result=await postData('product/edit_product_data',body)
        
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
  
  
        fetchAllProducts() 
  
        }
        
   
       }
  
  
       const handleEditPicture=async()=>{
        var  formData=new FormData()
        
        formData.append('productid',productId)
        formData.append('picture',picture.bytes)
        var result=await postData('product/edit_product_picture',formData)
               
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
        
        fetchAllProducts() 
   
       }
  
       const handleDelete=async(rowData)=>{
                  
                Swal.fire({
                  title: "Do you want to delete Product",
                  toast:true,
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "delete",
                  denyButtonText: `Don't delete`
                }).then(async(result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                  
                    var body ={productid:rowData.productid}
                    var result=await postData('product/delete_product_data',body)
  
                    if(result.status)
                    {Swal.fire({toast:true,title:"deleted", icon:"success"});
                    fetchAllProducts()}
   
                    else
                    Swal.fire({toast:true,title:"Fail to delete Record", icon:"error"});
                  } else if (result.isDenied) {
                    Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
                  }
                
                });
                
  
              }
    
              
    const fetchAllProducts=async()=>{
    var result=await getData('product/display_all_product')
    
    
    if(result.status)
    { setProductData(result.data)}
    
    }
    useEffect(function(){fetchAllProducts()},[])

    
    const handleClose=()=>{
        setOpen(false)
  
  
    }


    const handleOpen=(rowData)=>{
        setOpen(true)
        fetchAllSubCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setBrandId(rowData.brandid)
        setProductId(rowData.productid)
        setProductname(rowData.productname)
        setDescription(rowData.description)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)


        
    }


    
   const showProductForm=()=>{
    return(
     <Dialog
     open={open}
     onClose={handleClose} 
     maxWidth={"md"}
     >
      
       <DialogContent>
       <div className={classes.displaybox}>
             <Grid container spacing={3}>
                 <Grid item xs={12}>
                 <TitleComponent title="Edit Product Data" logo="logo.png" />
                 </Grid>
 
                 <Grid item  xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category"
                     value={categoryId}
                     onChange={handleCategoryChange}
                     error={error.categoryId}
                     onFocus={()=>handleError('categoryId',null)}>
                        
                        {fillAllCategory()}

                    </Select>
                    {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>SubCategory</InputLabel>
                    <Select label="Subcategory"
                    value={subCategoryId}
                    onChange={(event)=>setSubCategoryId(event.target.value)}
                    error={error.subCategoryId}
                    onFocus={()=>handleError('subCategoryId',null)}>
                        {fillAllSubCategory()}

                    </Select>
                    {error.subCategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subCategoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select label="Brand"
                    value={brandId}
                    onChange={(event)=>setBrandId(event.target.value)}
                    error={error.brandId}
                    onFocus={()=>handleError('brandId',null)}>
                        {fillAllBrand()}

                    </Select>
                    {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}
                </FormControl>
            </Grid>
 
                 <Grid item xs={12}>
                     <TextField value={productname} onFocus={()=>handleError('productname',null)} error={error.productname} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.productname}</span>} onChange={(event)=>setProductname(event.target.value)} label="Product Name" fullWidth />
                 </Grid>

                 <Grid item xs={12}>
                <TextField label="Product Descripton" onFocus={()=>handleError('description',null)} value={description}  helperText={<span style={{fontFamily:'kanit',fontSize:13}}>{error.description}</span> } error={error.description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
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



    
    function showAllProducts() {
        return (
          <MaterialTable
            title="Main Products"
            columns={[
              { title: 'ProductId', field: 'productid' },
              { title: 'Category',  field:  'categoryname'  },
              { title: 'Subcategory ', field: 'subcategoryname' },
              { title: 'Brand ', field: 'brandname' },
              { title: 'Product', field: 'productname' },
              { title: 'Description', field: 'description' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></> },
               
            ]}
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={productData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit product',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'delete product',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
               icon: 'add',
               tooltip: 'Add New Product',
               isFreeAction: true,
               onClick: (event) => navigate('/admindashboard/products')
              }
            ]}
          />
        )
      }

  return(<div className={classes.root}>
    <div className={classes.boxdisplay}>
    {showAllProducts()}
  </div>
  {showProductForm()}
  </div>
   )
 
 






}