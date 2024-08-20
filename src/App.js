import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import AddCategory from './components/addshoecategory/AddCategory'; // Import the AddCategory component
import NotFound from './components/notfound/NotFound'; // Import NotFound component
import MainContent from './components/maincontent/MainContent';
import AddShoes from './components/addshoes/Addshoes';
import UserProfile from './components/profile/Profile';
import ViewOrders from './components/vieworders/ViewOrders';
import AllShoes from './components/viewshoes/Allshoes';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
  
          <Routes>
            <Route index element={<MainContent />} /> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/addshoes" element={<AddShoes />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/vieworders" element={<ViewOrders />} />
            <Route path="/get-all-shoes" element={<AllShoes />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
