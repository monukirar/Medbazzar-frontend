import { useState,useEffect } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material"
import { subStyles } from "./SubCategoryCss";
import TitleComponent from "../../components/admin/TitleComponent"
import Swal from "sweetalert2"
import { postData,getData } from "../../services/FetchNodeServices"
import { useNavigate } from "react-router-dom"
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"


export default function SubCategory(props)
{
  var classes=subStyles()
  var navigate=useNavigate()

    const [categoryId,setCategoryId]=useState('')
    const [subcategoryname,setSubcategoryname]=useState('')
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [error,setError]=useState({})
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
        try{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        }
        catch(e)
        {}
    }

    const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))

    }

    
    const handleReset=()=>{
      setCategoryId('')
      setSubcategoryname('')
      setPicture({file:'icon.png',bytes:''}) 

  }
  const handleSubmit=async()=>{

      var submit=true

      if(categoryId.length==0)
      {
          handleError('subcategory','Pls input subcategory id ')
          submit=false
      }
      if(subcategoryname.length==0)
      {
          handleError('subcategoryname','Pls input subcategory name ')
          submit=false
      }
      if(picture.bytes.length==0)
      {
          handleError('picture','Pls choose icon...')
          submit=false
      }
      if(submit)
      {  

          var formdata=new FormData()
          formdata.append('categoryid',categoryId)
          formdata.append('subcategoryname',subcategoryname)
          formdata.append('picture',picture.bytes)

          var result=await postData('subcategory/submit_subcategory',formdata)

          if(result.status)
          {
              Swal.fire({
                  icon: "Success",
                  title: result.message,
                  timer:1500
                });
          }
          else
          {
              Swal.fire({
                  icon: "error",
                  title: result.message,
                  timer:1500
                });
          }

      }
  }


    




return(<div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={3}>
               <Grid item xs={12}> 
                  <TitleComponent title="Add New Subcategory" logo="logo.png" listicon="list.png" page="/admindashboard/displayallsubcategory"  />
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
                  <TextField value={subcategoryname} onFocus={()=>handleError('subcategoryname',null)} error={error.subcategoryname} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.subcategoryname}</span>} onChange={(event)=>setSubcategoryname(event.target.value)} label="Subcategory Name "  fullWidth/>
               </Grid>

               <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                  Upload
                  <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}

               </Grid>

               <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                    <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmit} variant="contained" fullWidth>
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleReset} variant="contained" fullWidth>
                        Reset
                    </Button>
                </Grid>
  
  
          </Grid>


        </div>

      </div>)



}