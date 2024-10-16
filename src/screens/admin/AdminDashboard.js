import { AppBar, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography,Box } from "@mui/material";

import { serverURL } from "../../services/FetchNodeServices";
import { dashboardStyles } from "./AdminDashboardCss";

import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Routes,Route,useNavigate} from "react-router-dom";
import Brand from "./Brand";
import Categories from "./Categories";
import DisplayAllBrands from "./DisplayAllBrands";
import DisplayAllCategory from "./DisplayAllCategory";

import SubCategory from "./SubCategory";
import DisplayAllSubcategory from "./DisplayAllSubcategory";
import Products from "./Products"
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails";
import DisplayAllProductdetails from "./DisplayAllProductdetails";
import Banner from "./Banner";
import Concern from "./Concern";


export default function AdminDashboard(props){
    const classes=dashboardStyles()
    const navigate=useNavigate()
    var adminData=JSON.parse(localStorage.getItem('ADMIN'))
    
    

    return(
        <Box>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        MedBazzar
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spaces={3} style={{paddingInlineStart:5}}>
                <Grid item xs={2.2}>
                    <Paper >
                        <div className={classes.leftBarStyle}>
                            <img src={`${serverURL}/images/${adminData.picture}`} style={{width:70,height:70,borderRadius:35}} />
                            <div className={classes.nameStyle} >{adminData.adminname}</div>
                            <div className={classes.emailStyle}>{adminData.emailid}</div>
                            <div className={classes.phoneStyle}>{adminData.mobileno}</div>
                        </div>
                        <div className={classes.menuStyle}>
                            <List>
                                <Divider/>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Sub Category</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrands')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproducts')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Products</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/concern')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={()=>navigate('/admindashboard/banners')}>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                                    </ListItemButton>
                                </ListItem>

                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                                    </ListItemButton>
                                </ListItem>

                            </List>
                        </div>
                    </Paper>

                </Grid>

                <Grid item xs={9.8} style={{padding:20}}>
                    <Routes>
                        <Route element={<Categories/>} path='/category' />
                        <Route element={<DisplayAllCategory/>} path='/displayallcategory' />
                        <Route element={<SubCategory/>} path='/subcategory' />
                        <Route element={<DisplayAllSubcategory/>} path='/displayallsubcategory' />
                        <Route element={<Brand/>} path='/brand' />
                        <Route element={<DisplayAllBrands/>} path='/displayallbrands' />
                        <Route element={<Products/>} path='/products' />
                        <Route element={<DisplayAllProducts/>} path='/displayallproducts' />
                        <Route element={<ProductDetails/>} path='/productdetails' />
                        <Route element={<DisplayAllProductdetails/>} path='/displayallproductdetails' />
                        <Route element={<Banner/>} path='/banners' />
                        <Route element={<Concern/>} path='/concern' />
                        
                    </Routes>
                </Grid>


            </Grid>





        </Box>
    )



}


