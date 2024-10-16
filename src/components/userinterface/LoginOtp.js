import { Grid, Button, Input, InputAdornment } from "@mui/material";

import { LoginStyles } from "./LoginCss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GetOtp from "./GetOtp";
import LoginDetail from "./LoginDetail";
import { postData } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";

export default function LoginOtp(props) {
  const classes = LoginStyles();
  var navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [mobileno, setMobileno] = useState("");
  const [otp, setOtp] = useState(0);
  const [userStatus, setUserStatus] = useState(false);
  const [userData, setUserData] = useState([]);
  var dispatch = useDispatch();

  const generateOTP = () => {
    var myotp = parseInt(Math.random() * 8999) + 1000;
    alert(myotp);
    setOtp(myotp);
  };

  const handleOTP = async () => {
    var result = await postData("users/check_userdata", { mobileno: mobileno });
    if (result.status == false) {
      generateOTP();
      setStatus(!status);
      setUserStatus(false);
    } else {
      generateOTP();
      setStatus(!status);
      setUserStatus(true);
      setUserData(result.data);
    }
  };

  return (
    <Grid className={classes.container}>
      {status ? (
        <Grid xs={12} md={10} className={classes.onetextbox}>
          <Grid xs={10} className={classes.box}>
            <div style={{ width: "100%", height: "auto" }}>
              <div>
                <p className={classes.p}>Sign in to MedBazzar</p>
                <p
                  style={{
                    marginTop: -45,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  to access your Addresses, Orders & Wishlist
                </p>
              </div>
              <Grid
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 70,
                }}
              >
                <Input
                  placeholder="Enter Your Mobile Number"
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">+91 -</InputAdornment>
                  }
                  onChange={(e) => setMobileno(e.target.value)}
                />
              </Grid>
              <Grid
                xs={12}
                style={{
                  background: "blue",
                  width: "50%",
                  marginTop: 90,
                  borderRadius: 10,
                  display: "flex",
                  marginLeft: "25%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button onClick={handleOTP} style={{ color: "white" }}>
                  Get OTP
                </Button>
              </Grid>

              <Grid xs={12}>
                <p
                  style={{
                    fontSize: 14,
                    marginTop: 40,
                    marginLeft: 15,
                    marginRight: 10,
                  }}
                >
                  By continuing, you agree to our{" "}
                  <span style={{ color: "blue" }}> Terms of Service </span> and{" "}
                  <span style={{ color: "blue" }}>
                    {" "}
                    Privacy & Legal Policy{" "}
                  </span>{" "}
                </p>
              </Grid>
            </div>
          </Grid>
        </Grid>
      ) : userStatus ? (
        <GetOtp mobileno={mobileno} otp={otp} userData={userData} />
      ) : (
        <LoginDetail mobileno={mobileno} otp={otp} />
      )}
    </Grid>
  );
}
