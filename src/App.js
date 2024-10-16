import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Concern from "./screens/admin/Concern"
import Home from './screens/userinterface/Home';


import ProductDetail from './screens/ProductDetail';
import Carts from './screens/userinterface/Carts'
import Login from './screens/userinterface/Login'
import AddressComponent from './components/userinterface/AddressComponent';

import DisplayOrder from './components/userinterface/DisplayOrder';

import FilterPage from './screens/userinterface/FilterPage'






function App() {
  return (
    <div>
     <Router>
      <Routes>
     
        
        <Route element={<AdminLogin/>} path={'/adminlogin'}/>
        <Route element={<Concern/>} path={'/concern'} />
            
        <Route element={<AdminDashboard/>} path={'/admindashboard/*'} />
        <Route element={<Home />} path={'/home'} />
       
        <Route element={<ProductDetail/>} path={'/productdetail'} />
        <Route element={<Carts />} path={'/carts'} />
        <Route element={<Login />} path={'/Login'} /> 
        <Route element={<AddressComponent />} path={'/address'} />
   
    
        <Route element={<DisplayOrder/>} path={'/displayorder'}/>
        <Route element={<FilterPage/>} path={'/filterpage/:pattern'}/>
        
        
        
      </Routes>
     </Router>
    </div>
  );
}

export default App;
