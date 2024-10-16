import Drawer from "@mui/material/Drawer";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function AddAddress(props) {
  const [addressone, setAddressOne] = useState("");
  const [addresstwo, setAddressTwo] = useState("");
  const [landmark, setLankmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async () => {
    var address = {
      mobileno: props?.userData?.mobileno,
      address: addressone + ";" + addresstwo,
      landmark: landmark,
      pincode: pincode,
      state: state,
      city: city,
    };
    var result = await postData("users/submit_user_address", address);
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add your address...",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      props.setStatus(false);
      props.setPageRefresh(!props.pageRefresh);
    } else {
      props.setPageRefresh(!props.pageRefresh);
    }
  };

  const handleClose = () => {
    props.setStatus(!props.status);
    //props.setPageRefresh(!props.pageRefresh)
  };

  const drawerList = () => {
    return (
      <div>
        <span
          style={{
            display: "flex",
            marginLeft: 10,
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "Kanit",
            marginTop: 20,
          }}
        >
          Add Address{" "}
          <div
            style={{ marginLeft: "60%", cursor: "pointer" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </div>
        </span>

        <div
          style={{
            fontFamily: "Kanit",
            fontSize: "1em",
            marginLeft: 10,
            display: "flex",
            marginTop: 5,
            fontSize: 20,
          }}
        >
          {props?.userData?.username}
        </div>
        <div
          style={{
            fontFamily: "Kanit",
            fontSize: "1em",
            color: "grey",
            marginLeft: 10,
            display: "flex",
            marginTop: 12,
          }}
        >
          {" "}
          Enter your Address details
        </div>
        <div>
          <List
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <ListItem>
              <ListItemText>
                <TextField
                  label="Address Line One"
                  onChange={(e) => setAddressOne(e.target.value)}
                  variant="standard"
                  style={{ width: "90%" }}
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <TextField
                  label="Address Line Two"
                  onChange={(e) => setAddressTwo(e.target.value)}
                  variant="standard"
                  style={{ width: "90%" }}
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <TextField
                  label="Landmark"
                  onChange={(e) => setLankmark(e.target.value)}
                  variant="standard"
                  style={{ width: "90%" }}
                />
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <TextField
                  label="Pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  variant="standard"
                  style={{ width: "90%" }}
                />
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <TextField
                  label="State"
                  onChange={(e) => setState(e.target.value)}
                  variant="standard"
                  style={{ width: "41%", marginRight: "5%" }}
                />
                <TextField
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                  variant="standard"
                  style={{ width: "45%" }}
                />
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{
                    fontSize: 12,
                    background: "#006266",
                    marginTop: 10,
                    borderRadius: 20,
                    width: "90%",
                  }}
                >
                  Save & Proceed
                </Button>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Drawer anchor={"right"} open={props?.status} onClose={handleClose}>
        {drawerList()}
      </Drawer>
    </div>
  );
}
