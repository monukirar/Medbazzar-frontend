import { Grid } from "@mui/material";
import FilterList from "../../components/userinterface/FilterList";
import Header from "../../components/userinterface/Header";
import MenuBar from "../../components/userinterface/MenuBar";
import ProductList from "../../components/userinterface/ProductList";

import { postData } from "../../services/FetchNodeServices";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FilterPage(props) {
  var location = useLocation();
  const [pageRefresh, setPageRefresh] = useState(false);
  var param = useParams();
  const [products, setProducts] = useState([]);
  var categoryid = "";
  try {
    if (location?.state?.categoryid == undefined) categoryid = null;
    else categoryid = location?.state?.categoryid;
  } catch (e) {}

  //     var pattern=''
  //     try
  //     {
  //       if(location?.state?.pattern==undefined)
  //         pattern=null
  //       else
  //         pattern=location?.state?.pattern

  // }
  //     catch(e){}

  const fetchAllProduct = async () => {
    var result = await postData(
      "userinterface/display_all_productdetail_by_category",
      { categoryid: categoryid, pattern: param["pattern"] }
    );
    setProducts(result.data);
  };
  useEffect(
    function () {
      fetchAllProduct();
    },
    [param["pattern"]]
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      spacing={2}
      style={{
        height: "100%",
        width: "auto",
        fontFamily: "kanit",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Grid item xs={12} style={{ display: "block", width: "100%" }}>
        <Header pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        {matches ? <MenuBar /> : <div></div>}
      </Grid>
      {matches ? (
        <Grid item xs={4} style={{ background: "#fff" }}>
          <FilterList
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
          />
        </Grid>
      ) : (
        <div></div>
      )}
      <Grid
        item
        xs={matches ? 8 : 12}
        style={{
          background: "#fff",
          width: "100%",
          overflow: matches ? "" : "hidden",
        }}
      >
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
          <ProductList
            data={products}
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
          />
        </div>
      </Grid>
      {matches ? (
        <Grid item xs={12} style={{ marginTop: "3%" }}>
          {
            // <FooterComponent/>
          }
        </Grid>
      ) : (
        <div></div>
      )}
    </Grid>
  );
}
