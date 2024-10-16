import { AppBar, Badge, Box, Toolbar } from "@mui/material";
import logo from "../../assets/logo.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { dashboardStyles } from "../../screens/userinterface/HomeCss";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { serverURL } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowCardProducts from "../userinterface/ShowCartProducts";
import ShowOrderCart from "../userinterface/ShowOrderCart";
// import Cookies from "js-cookie"

export default function Header(props) {
  const theme = useTheme();
  const classes = dashboardStyles();
  var products = useSelector((state) => state.data);
  var user = useSelector((state) => state.user);
  // try{
  //   var prd=JSON.parse(Cookies.get('DATA'))
  // }
  // catch
  // {
  //   prd={}
  // }
  // var keys=Object?.keys(prd)
  var keys = Object?.keys(products);
  var userData = "";
  var userInformation = {};
  try {
    userData = Object.values(user)[0].username.split(" ");
    userData = userData[0];

    userInformation = Object.values(user)[0];
  } catch (e) {}

  var navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Orderopen, setOrderOpen] = useState(false);
  const [pattern, setPattern] = useState("");
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawer = () => {
    setStatus(true);
  };
  const handleClose = () => {
    setStatus(false);
  };

  const showCardDetails = () => {
    setIsOpen(true);
  };

  const hideCardDetails = () => {
    setOrderOpen(false);
    setIsOpen(false);
  };

  const showOrderCart = () => {
    setOrderOpen(true);
  };

  const drawerList = () => {
    return (
      <Paper>
        <div className={classes.leftBarStyle}>
          <img
            src={`${serverURL}/images/monu.jpg`}
            style={{ width: 70, height: 70, borderRadius: 35 }}
          />
          <div className={classes.nameStyle}>{userData?.username}</div>
          <div className={classes.emailStyle}>{userData?.emailid}</div>
          <div className={classes.phoneStyle}>{`+91${userData?.mobileno}`}</div>
        </div>
        <div className={classes.menuStyle}>
          <List>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Dashboard</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admindashboard/displayallcategory")}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Category List</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate("/admindashboard/displayallsubcategory")
                }
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Sub Category</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admindashboard/displayallbrands")}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Brands List</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admindashboard/displayallproducts")}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Products</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admindashboard/concern")}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Concern</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate("/admindashboard/displayallproductdetails")
                }
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>
                      ProductDetails
                    </span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admindashboard/banners")}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Banners</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Sales Report</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={classes.menuItemStyle}>Logout</span>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Paper>
    );
  };
  const handleFilterPage = () => {
    navigate(`/filterpage/${pattern}`);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") navigate(`/filterpage/${e.target.value}`);
  };

  const secondarySearchBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: "#fff" }} position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <MenuOutlinedIcon
              onClick={handleDrawer}
              style={{ color: "#000", fontSize: 30 }}
            />
            {SearchBarComponent()}
            <div
              style={{
                display: "flex",
                width: 70,
                justifyContent: "space-between",
              }}
            >
              <PersonOutlineOutlinedIcon
                style={{ color: "#000", fontSize: 30 }}
              />

              <PhoneOutlinedIcon style={{ color: "#000", fontSize: 30 }} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  const SearchBarComponent = () => {
    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          margin: 1,
          display: "flex",
          alignItems: "center",
          width: "50%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products Here.."
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setPattern(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon onClick={handleFilterPage} />
        </IconButton>
      </Paper>
    );
  };

  var products = useSelector((state) => state.data);
  var userData = Object.values(useSelector((state) => state.user))[0];

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <Box
      sx={{ flexGrow: 1, position: "relative" }}
      onMouseLeave={hideCardDetails}
    >
      <AppBar style={{ background: "#fff" }} position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logo}
            style={{ width: 150 }}
            onClick={() => navigate("/home")}
          />
          {!matches ? SearchBarComponent() : <div></div>}
          <p
            style={{
              fontSize: matches ? "1.0em" : "1.3em",
              fontWeight: "bold",
              color: "black",
              marginLeft: matches ? "9.0em" : "1.0em",
            }}
          >
            {userData?.username}
          </p>
          <div
            style={{
              display: "flex",
              width: !matches ? 110 : 50,
              justifyContent: "space-between",
            }}
          >
            {!matches ? (
              <PersonOutlineOutlinedIcon
                onClick={handleLogin}
                /*onMouseOver={showOrderCart} */ style={{
                  color: "#000",
                  fontSize: 30,
                  cursor: "pointer",
                }}
              />
            ) : (
              <div></div>
            )}

            <Badge badgeContent={keys?.length} color="primary">
              <ShoppingCartOutlinedIcon
                onClick={() => navigate("/carts")}
                onMouseOver={showCardDetails}
                style={{ color: "#000", fontSize: 30, cursor: "pointer" }}
              />
            </Badge>

            {!matches ? (
              <PhoneOutlinedIcon style={{ color: "#000", fontSize: 30 }} />
            ) : (
              <div></div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {matches ? secondarySearchBar() : <div></div>}
      <Drawer anchor={"left"} open={status} onClose={handleClose}>
        {drawerList()}
      </Drawer>
      <ShowCardProducts isOpen={isOpen} />
      <ShowOrderCart isOpen={Orderopen} />
    </Box>
  );
}
