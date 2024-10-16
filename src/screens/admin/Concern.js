import {useState} from "react"
import { Button,Grid,TextField,Avatar } from "@mui/material"

import TitleComponent from "../../components/admin/TitleComponent"
import Swal from "sweetalert2"
import { postData } from "../../services/FetchNodeServices"
import { useNavigate } from "react-router-dom"
import { concernStyles } from "./ConcernCss"


export default function Concern(props)
{ var classes=concernStyles()
  var navigate=useNavigate()

    const [concern,setConcern]=useState('')
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [error,setError]=useState({})
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
        setConcern('')
        setPicture({file:'icon.png',bytes:''}) 

    }
    const handleSubmit=async()=>{

        var submit=true

        if(concern.length==0)
        {
            handleError('concern','Pls input category name ')
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
            formdata.append('concernname',concern)
            formdata.append('picture',picture.bytes)

            var result=await postData('concern/submit_concern',formdata)

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
                <TitleComponent title="Add New Concern" logo="logo.png"  />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={concern} onFocus={()=>handleError('concern',null)} error={error.concern} helperText={<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13}}>{error.concern}</span>} onChange={(event)=>setConcern(event.target.value)} label="Concern Name" fullWidth />
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