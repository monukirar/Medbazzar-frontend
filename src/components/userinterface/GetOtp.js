import { Grid, Button} from "@mui/material";

import { LoginStyles } from "./LoginCss";
import { useState } from "react";
import OtpInput from "react-otp-input";
import LoginOtp from "./LoginOtp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function GetOtp(props) {
  var navigate = useNavigate("");
  var dispatch = useDispatch();
  const classes = LoginStyles();
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(true);

  const handleVerifyOtp = () => {
    if (otp == props.otp) {
      dispatch({
        type: "ADD_USER",
        payload: [props?.mobileno, props?.userData],
      });
      navigate("/carts");
    } else {
      alert("Invalid OTP...");
    }
  };

  return (
    <Grid className={classes.container}>
      {status ? (
        <Grid xs={12} md={10} className={classes.onetextbox}>
          <Grid xs={10} className={classes.box}>
            <div style={{ width: "100%", height: 400 }}>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "kanit",
                    fontSize: 28,
                    fontWeight: "bold",
                  }}
                >
                  Verify Phone Number
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -25,
                    fontSize: 14,
                  }}
                >
                  An SMS with 4-digit OTP was sent to
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  +91 {props.mobileno}{" "}
                  <span
                    onClick={() => setStatus(!status)}
                    style={{ color: "blue", cursor: "pointer", marginLeft: 5 }}
                  >
                    change
                  </span>
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 50,
                }}
              >
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{ width: 35, height: 35 }}
                />
              </div>

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
                <Button onClick={handleVerifyOtp} style={{ color: "white" }}>
                  Verify
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
      ) : (
        <LoginOtp />
      )}
    </Grid>
  );
}
