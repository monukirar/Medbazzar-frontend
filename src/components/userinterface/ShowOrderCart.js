
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ShowOrderCart(props)
{ 
    var navigate=useNavigate()
    
    
    return(<Paper elevation={2} style={{display:props.isOpen?'flex':'none',position:'absolute',top:50,right:70,zIndex:3}}>
     <div style={{width:300,height:'auto',display:'flex',flexDirection:'column',padding:5}}>
       
        
        <div  onClick={()=> navigate('/displayorder')} style={{display:'flex',cursor:'pointer',justifyContent:'center',alignItems:'center',margin:10,background:'#0abde3',color:'#fff',width:280,height:40,borderRadius:10}}>
            <div>My Order</div>

        </div>
        </div>       
    </Paper>)
}