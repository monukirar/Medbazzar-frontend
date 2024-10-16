import { Divider, Grid } from "@mui/material";
import { serverURL, getData } from "../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { MenuItem, FormControl,} from "@mui/material";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FooterComponentStyles } from "./FooterComponentCss";

export default function FooterComponent(props) {
  var classes = FooterComponentStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [categoryList, setCategoryList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    if (result.status) {
      setCategoryList(result.data);
    }
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fillAllCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  return (
    <Grid container spacing={3} className={classes.maincontainer}>
      <Grid item xs={12} md={6}>
        <Grid item xs={12}>
          <span className={classes.follow}>Follow us</span>

          <Grid
            item
            xs={12}
            style={{ margin: "15px 5px 5px 90px", display: "flex" }}
          >
            <img src={`${serverURL}/images/fb.png`} className={classes.image} />
            <img
              src={`${serverURL}/images/insta.webp`}
              className={classes.image}
            />
            <img
              src={`${serverURL}/images/twitter.jpg`}
              className={classes.image}
            />
            <img
              src={`${serverURL}/images/link.png`}
              style={{ width: 35, marginRight: "2%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              fontSize: 16,
              fontFamily: "kanit",
            }}
          >
            <Grid item xs={4}>
              <FormControl
                fullWidth
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ced6e0",
                }}
              >
                <p style={{ color: "black" }}>Categories</p>

                {fillAllCategory()}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                fullWidth
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ced6e0",
                }}
              >
                <p style={{ color: "black" }}>Madicines</p>

                <MenuItem>Buy Medicines</MenuItem>
                <MenuItem>Upload Doctor's Note</MenuItem>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl
                fullWidth
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ced6e0",
                }}
              >
                <p style={{ color: "black" }}>Other</p>

                <MenuItem>Offers</MenuItem>
                <MenuItem>Blogs</MenuItem>
                <MenuItem>Terms & Conditions</MenuItem>
                <MenuItem>Privacy Policy</MenuItem>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid item xs={12}>
          <p
            style={{
              fontSize: 18,
              fontFamily: "kanit",
              marginLeft: "1%",
              display: "flex",
              alignItems: "center",
            }}
          >
            Download the Mobile app
          </p>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ height: "15%", display: "flex", alignItems: "center" }}
        >
          <img
            src={`${serverURL}/images/google play.png`}
            style={{ width: 150 }}
          />
          <img src={`${serverURL}/images/app.png`} style={{ width: 120 }} />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            margin: "35px 5px 5px 5px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={1}>
            <MailTwoToneIcon
              style={{ color: "#bdc3c7", fontSize: 33, display: "flex" }}
            />
          </Grid>

          <Grid item xs={11} style={{ display: "flex" }}>
            <p style={{ fontSize: 20, fontFamily: "Bold", color: "#747d8c" }}>
              {" "}
              Email us <br />
              <span style={{ color: "#ced6e0", fontFamily: "inherit" }}>
                Info@MedBazzar.in
              </span>
            </p>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            margin: "0px 5px 5px 5px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={1}>
            <WifiCalling3Icon style={{ fontSize: 33, color: "#bdc3c7" }} />
          </Grid>

          <Grid item xs={11}>
            <p style={{ fontSize: 20, fontFamily: "Bold", color: "#747d8c" }}>
              {" "}
              Give us to missed call <br />
              <span style={{ color: "#ced6e0", fontFamily: "inherit" }}>
                6263487299
              </span>
            </p>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: "#ced6e0" }} />

        <p
          style={{
            fontSize: 20,
            fontFamily: "Bold",
            color: "#747d8c",
            fontWeight: "bold",
          }}
        >
          15 Years Of Trust{" "}
        </p>

        <span style={{ color: "#ced6e0" }}>
          Over the last 15 years,we have touched the lives of lakhs of Indian
          families by serving them with only the best quality and genuine
          healthcare products.With over 300+ stores,a comprehensive website and
          an easy-to-use app,
        </span>
      </Grid>
    </Grid>
  );
}
