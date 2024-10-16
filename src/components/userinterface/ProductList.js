// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { serverURL } from "../../services/FetchNodeServices";
// import { Button,Grid } from "@mui/material";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

// import {Divider} from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import PlusMinusComponent from "./PlusMinusComponent";
// import {  useDispatch,useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { useState } from "react";
// export default function ProductList(props){
//   var navigate = useNavigate();
//   var dispatch=useDispatch()
//   const [pageRefresh,setPageRefresh]=useState(false)

//   var productFromRedux=useSelector(state=>state.data)
//   var productRedux=Object.values(productFromRedux)

//     const theme = useTheme();
//     const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
//   const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
//   const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
//   var product = props?.data

//   const handleChange=(v,item)=>{
//     if(v>0)
//     {
//     item['qty']=v

//     dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
//     }
//     else
//     {
//       dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
//     }
//    setPageRefresh(!pageRefresh)
//   }

//       const showSlide = (item) => {

//         return(<div onClick={()=>handleProductDetail(item)} style={{ display: "flex", justifyContent: "center" }}>
//               <img
//                 src={`${serverURL}/images/${item.picture}`}
//                 style={{ width: "70%", borderRadius: 0, height: "auto",aspectRatio:3/3 }}
//               />
//             </div>)

//         };
//         const handleProductDetail=(item)=>{
//           navigate('/productdetail',{state:{data:item}})

//         }

//       const productDetail = () => {
//         return product?.map((item, index) => {
//           return (
//             <div >
//               <div
//                 style={{
//                   width: "80%",
//                   height: "auto",
//                   display: "flex",
//                   justifyContent: "center",
//                   margin: "0 auto",

//                 }}
//               >
//                 <Grid container spacing={1}>
//                   <Grid item xs={12}>
//                     <FavoriteBorderIcon
//                       style={{
//                         display: "flex",
//                         marginLeft: "auto",
//                         marginTop: 10,
//                         fontSize: 30,
//                         color: "#e84393",
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     {showSlide(item)}
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     style={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       marginTop: 0.9,
//                     }}
//                   >
//                     <img src={logo} style={{ width: 85,  }} />
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}

//                   >
//                   <div style={{
//                       fontSize: matchesMd?"0.7em":"1.0em",
//                       display: "flex",
//                       fontWeight: "bold",
//                       margin: 2,
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       display: "-webkit-box",
//                       WebkitLineClamp: "2",
//                       WebkitBoxOrient: "vertical",
//                     }}>
//                     {item.description.length<=20?<div>{item.description}<div>&nbsp;</div></div>:item.description}
//                   </div>

//                     <div>{item.weight} {item.weighttype}</div>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     style={{
//                       fontSize: matchesMd?"0.7em":"1.0em",
//                       display: "flex",
//                       margin: 2,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {item.offerprice==0?  <span>&#x20B9;{item.price}</span>:
//                     <div>
//                     <span style={{fontWeight:600,color:'grey',textDecoration:"line-through",marginRight:5}}>&#x20B9;{item.price}</span>
//                    <span> &#x20B9;{item.offerprice}</span>
//                    </div>}

//                   </Grid>
//                   <Grid item xs={12}>
//                     <Divider style={{ borderWidth: 1.5 }}></Divider>
//                   </Grid>
//                   <Grid item xs={12} style={{ display: "flex",justifyContent:'center',alignItems:'center'  }}>
//                     <Grid item xs={6} style={{ display: "flex", margin: 2 }}>
//                       <PlusMinusComponent qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)} />
//                     </Grid>
//                     <Grid
//                       item
//                       xs={6}
//                       style={{width:matchesMd?10:40}}

//                     >
//                     <Button
//                           variant="text"
//                           style={{color:'#fff',background:'#000',fontSize:matchesMd?"0.6em":"0.8em",margin:5,width:matchesMd?"1em":"6em"}}
//                           size='small'
//                         >
//                           Buy Now
//                         </Button>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </div>
//             </div>
//           );
//         });
//       };

//   return(
//       <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start',width:"50%",marginTop:'3%' ,background:"#fff",alignItems:'stretch'}}>

//     {productDetail()}

//     </div>

//     )
// }

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PlusMinusComponent from "./PlusMinusComponent";
import {  serverURL } from "../../services/FetchNodeServices";
import logo from "../../assets/logo.png";


export default function ProductList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const productFromRedux = useSelector((state) => state.data);
  const productRedux = Object.values(productFromRedux);
  var product = props?.data;

  const handleChange = (v, item) => {
    if (v > 0) {
      item["qty"] = v;
      dispatch({ type: "ADD_PRODUCT", payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: "DELETE_PRODUCT", payload: [item.productdetailid] });
    }

    props.setPageRefresh(!props?.pageRefresh);
  };

  const handleProductDetail = (item) => {
    navigate("/productdetail", { state: { data: item } });
  };

  const showProduct = () => {
    return props.data.map((item) => (
      <div
        key={item.productdetailid}
        style={{
          width: matches ? "20%" : "100%",
          marginRight: "3%",
          border: "solid white",
          marginTop: "2%",
        }}
      >
        <BookmarkAddOutlinedIcon
          style={{ marginLeft: "auto", display: "flex" }}
        />
        <img
          onClick={() => handleProductDetail(item)}
          src={`${serverURL}/images/${item.picture}`}
          style={{
            width: "100%",
            aspectRatio: 3 / 3,
            borderRadius: 0,
            height: "auto",
          }}
        />
        <img
          src={logo}
          style={{
            height: 15,
            width: 55,
            display: "flex",
            marginLeft: matches ? "75%" : "85%",
            fontWeight: "bold",
          }}
        />
        <div
          style={{
            fontSize: matches ? "1.0em" : ".7em",
            display: "flex",
            fontWeight: "bold",
            margin: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description.length <= 20 ? (
            <div>
              {item.description}
              <div>&nbsp;</div>
            </div>
          ) : (
            item.description
          )}
        </div>
        <div>
          {item.weight} {item.weighttype}
        </div>
        {item.offerprice === 0 ? (
          <div style={{ fontSize: 20, fontWeight: "bolder" }}>
            &#8377;{item.price}
          </div>
        ) : (
          <div>
            <span
              style={{ fontFamily: "kanit", fontSize: 20, fontWeight: "bold" }}
            >
              {" "}
              &#8377;{item.offerprice}{" "}
            </span>
            <span style={{ fontFamily: "kanit", fontSize: 15, color: "gray" }}>
              {" "}
              <s>MRP &#8377;{item.price}</s>{" "}
            </span>
            <span
              style={{
                fontFamily: "kanit",
                fontSize: 11,
                background: "#f5a623",
                padding: 3,
                borderRadius: 15,
                color: "#6a7d27",
              }}
            >
              {" "}
              20% Off{" "}
            </span>
          </div>
        )}

        <Divider style={{ width: "100%", background: "#95a5a6" }} />
        <div style={{ display: "flex", fontSize: 13, alignItems: "center" }}>
          <AccessTimeIcon
            style={{ height: 15, width: 15, marginRight: 5, color: "green" }}
          />
          Delivery within <span style={{ fontWeight: "bold" }}>1-3 days</span>
        </div>
        <div
          style={{
            fontSize: 13,
            marginTop: 10,
            fontWeight: "#535c68",
            display: "flex",
            alignItems: "center",
          }}
        >
          <PlusMinusComponent
            qty={
              productFromRedux[item.productdetailid]?.qty === undefined
                ? 0
                : productFromRedux[item.productdetailid]?.qty
            }
            onChange={(v) => handleChange(v, item)}
            width={80}
          />
          <Button
            style={{
              marginLeft: 20,
              height: 32,
              width: 90,
              background: "#2C3A47",
            }}
            variant="contained"
          >
            Buy
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        right: "50%",
        width: "100%",
        marginLeft: matches ? "-10%" : "2%",
        justifyContent: "flex-start",
        height: "100%",
        flexDirection: "column",
        width: "auto",
        marginTop: "3%",
        background: "#fff",
      }}
    >
      <span>All Product</span>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "auto",
          flexDirection: "row",
        }}
      >
        {showProduct()}
      </div>
    </div>
  );
}
