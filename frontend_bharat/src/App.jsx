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
import Dashboard from './componets/Dashboard';
import ActiveRentals from './componets/ActiveRentals';
import Wishlist from './componets/wishlist';
import RentalHistory from './componets/RentalHistory';
import ReviewPage from './componets/review-page';

// Import the new components
import StartRental from './componets/StartRental';
import EndRental from './componets/EndRental';
import Comingsoon from './componets/Comingsoon'; // Import Comingsoon component
import Support from './componets/OpenTicket';       // Import Support component

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/active-rentals" element={<ActiveRentals />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/rental-history" element={<RentalHistory />} />
            <Route path="/review/:itemId" element={<ReviewPage />} />

            {/* New routes for Start and End Rentals */}
            <Route path="/start-rental" element={<StartRental />} />
            <Route path="/end-rental" element={<EndRental />} />

            {/* New routes for Comingsoon and Support */}
            <Route path="/comingsoon" element={<Comingsoon />} />
            <Route path="/support" element={<Support />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;