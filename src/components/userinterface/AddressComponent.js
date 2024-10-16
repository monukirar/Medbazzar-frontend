import { Grid, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { postData } from "../../services/FetchNodeServices";
import { useEffect } from "react";
import { Radio } from "@mui/icons-material";

export default function AddressComponent(props) {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [status, setStatus] = useState();

  var products = useSelector((state) => state.data);
  var userData = Object.values(useSelector((state) => state.user))[0];

  const check_user_address = async () => {
    if (props?.userData?.mobileno == undefined) {
      setStatus(false);
    } else {
      var result = await postData("users/check_user_address", {
        mobileno: props?.userAddress?.mobileno,
      });
      if (result.status == false) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
  };

  useEffect(
    function () {
      check_user_address();
    },
    [userData?.mobileno, props?.pageRefresh]
  );

  const handleDrawer = () => {
    props.setStatus(!props.status);
  };

  const showAllAddress = (userAddress) => {
    return userAddress?.map((item) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
            fontSize: 15,
            color: "rgb(0 0 0 / 65%)",
            fontSize: matchesMd ? "0.8em" : "0.8em",
          }}
        >
          <div class="form-check">
            <div style={{ display: "flex", marginLeft: -20 }}>
              <input
                type="radio"
                class="form-check-input"
                id="radio2"
                name="optradio"
                value="option2"
              />
              {item?.address}
            </div>
            <div>{item?.landmark}</div>
            <div>
              {item?.state},{item?.city} {item?.pincode}
            </div>
            <div>91 - {props?.userData?.mobileno}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {status ? (
        <Grid
          style={{
            border: "solid 1px #00000021",
            borderRadius: 15,
            paddingTop: 15,
            paddingBottom: 15,
            marginTop: 7,
          }}
        >
          <Grid style={{ width: "95%", marginLeft: 15 }}>
            <div
              style={{
                fontFamily: "kanit",
                fontSize: 27,
                fontWeight: "bold",
                fontSize: matchesMd ? "1.5em" : "1.7em",
              }}
            >
              Delivery Address
            </div>
            <hr />
            <div style={{ marginTop: 15, fontFamily: "kanit", fontSize: 20 }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: matchesMd ? "0.8em" : "1.1em",
                }}
              >
                {props?.userAddress?.length == 0 ? (
                  <span>Please add your address to continue </span>
                ) : (
                  <div>
                    <div>{props?.userData?.username}</div>

                    {showAllAddress(props?.userAddress)}
                  </div>
                )}
                <Grid style={{ fontSize: matchesXS ? "0.2em" : "0.6em" }}>
                  <Button
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={handleDrawer}
                    style={{
                      background: "blue",
                      color: "white",
                      borderRadius: 30,
                      fontSize: matchesMd ? "0.7em" : "0.9em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p> Add New Address</p>
                  </Button>
                </Grid>
              </p>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
}
