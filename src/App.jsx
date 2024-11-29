import Header from "./componets/Header";
import Footer from "./componets/Footer";
import Body from "./componets/Body";
import Signup from './componets/Signup';
import RentItem from "./componets/rentitem";
import DetailPage from './componets/DetailPage';
import ListItem from './componets/list-item';
import Profile from "./componets/Profile";
import Account from "./componets/Account";
import Login from './componets/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <div className="">
          <Header />
          <Routes>
            <Route path="/" element={<Body />} /> {/* Home route */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/rentitem" element={<RentItem />} />
            <Route path="/details" element={<DetailPage />} />
            <Route path="/list-item" element={<ListItem />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
