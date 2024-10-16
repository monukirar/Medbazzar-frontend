import { Grid, TextField, Button } from "@mui/material";

import { LoginStyles } from "./LoginCss";
import { useState } from "react";
import OtpInput from "react-otp-input";
import LoginOtp from "./LoginOtp";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginDetail(props) {
  var navigate = useNavigate();
  var dispatch = useDispatch();
  const [status, setStatus] = useState(true);
  const classes = LoginStyles();
  const [otp, setOtp] = useState("");
  const [emailid, setEmailid] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = async () => {
    if (props.otp == otp) {
      var body = {
        mobileno: props.mobileno,
        emailid: emailid,
        username: firstname + " " + lastname,
      };
      var result = await postData("users/submit_user", body);
      if (result.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are registered now...",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        dispatch({ type: "ADD_USER", payload: [props.mobileno, body] });
        navigate("/carts");
      }
    } else {
      alert("Invalid OTP...");
    }
  };

  return (
    <Grid className={classes.container}>
      {status ? (
        <Grid xs={12} md={10} className={classes.onetextbox}>
          <Grid xs={10} className={classes.box}>
            <div>
              <p className={classes.p}>Welcome to MedBazzar</p>
              <p
                style={{
                  marginTop: -40,
                  marginLeft: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Please enter your details for a better shopping exprience
              </p>
            </div>

            <div className={classes.name}>
              <TextField
                label="Enter First Name*"
                variant="standard"
                onChange={(e) => setFirstname(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
            <div className={classes.name}>
              <TextField
                label="Enter Last Name "
                variant="standard"
                onChange={(e) => setLastname(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
            <div className={classes.name}>
              <TextField
                label="Enter Email ID "
                variant="standard"
                onChange={(e) => setEmailid(e.target.value)}
                style={{ width: 250 }}
              />
            </div>

            <div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "kanit",
                  fontSize: 25,
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
              }}
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{ width: 33, height: 33 }}
              />
            </div>

            <div className={classes.loginbutton}>
              <Button
                variant="contained"
                style={{ borderRadius: 15, width: 250 }}
                onClick={handleSubmit}
              >
                Get Started
              </Button>
            </div>

            <div>
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
                <span style={{ color: "blue" }}> Privacy & Legal Policy </span>{" "}
              </p>
            </div>
          </Grid>
        </Grid>
      ) : (
        <LoginOtp />
      )}
    </Grid>
  );
}
