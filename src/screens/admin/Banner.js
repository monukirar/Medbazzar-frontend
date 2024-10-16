import {useState,useEffect} from "react"
import { Button,Grid,Avatar } from "@mui/material"
import { bannerStyles } from "./BannerCss"
import TitleComponent from "../../components/admin/TitleComponent"
import Swal from "sweetalert2"
import { postData } from "../../services/FetchNodeServices"
import { useNavigate } from "react-router-dom"
import { getData } from "../../services/FetchNodeServices"
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';



export default function Banner(props)
{ var classes=bannerStyles()
  var navigate=useNavigate()

    
    const [bannertype,setBannerType]=useState('')
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [picture,setPicture]=useState({file:[],bytes:''})
    const [error,setError]=useState({})
    

    const handlePicture=async(event)=>{
        //alert(JSON.stringify(event.target.files))
    
        if(Object.values(event.target.files).length<=5)
        { Swal.fire({
            icon: "error",
            title: "Pls Upload 6 or more files",
            timer:1500,
            toast:true
          });
        }
        else{
            setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }
    
    
    }


    const handleError=(label,msg)=>{
     setError((prev)=>({...prev,[label]:msg}))

    }
    const handleReset=()=>{
       
        setBannerType('')
        setBrandId('')
        setPicture({file:[]}) 

    }
    const handleSubmit=async()=>{

        var submit=true

        if(bannertype.length==0)
        {
            handleError('banner','Pls select bannertype ')
            submit=false
        }
        if(brandId.length==0)
        {
            handleError('banner','Pls select brand name ')
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
            formdata.append('bannertype',bannertype)
            formdata.append('brandid',brandId)

            picture.file.map((item,i)=>{

                formdata.append('picture'+i,item)

            })

            var result=await postData('banner/submit_banner',formdata)
            

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



    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return (<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded"  /></div>)
        })
    }


    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TitleComponent title="Add New Banner" logo="logo.png" />
                </Grid>

                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Banner Type </InputLabel>
                    <Select label="Bannertype"
                    value={bannertype}
                    onChange={(event)=>setBannerType(event.target.value)}
                    error={error.bannertype}
                    onFocus={()=>handleError('bannertype',null)}>
                         <MenuItem value={'General'}>General</MenuItem>
                         <MenuItem value={"Brand"}>Brand</MenuItem>
                         <MenuItem value={'Trending'}>Trending</MenuItem>
                         <MenuItem value={'Popular'}>Popular</MenuItem>

                    </Select>
                    {error.bannertype?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.bannertype}</span>:<></>}
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Brand </InputLabel>
                    <Select label="Brand"
                    value={brandId}
                    onChange={(event)=>setBrandId(event.target.value)}
                    error={error.brandId}
                    onFocus={()=>handleError('brandId',null)}>
                        {bannertype==='Brand'? 
                        fillAllBrand() 
                     :  <MenuItem value={0}>None</MenuItem>
                        
                       
    }
                    </Select>
                    {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}
                </FormControl>
            </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}


                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <div style={{display:"flex",flexWrap:'wrap'}}>    
                 {showImages()}
                 </div>
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
