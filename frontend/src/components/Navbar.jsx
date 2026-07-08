import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  AuthContext  from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/ShopTodayLogo.png" alt="ShopToday" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }} />
          ShopToday
        </Link>
      </div>
      <ul className="navbar-links">
        <li className='navbar-links-list'><Link to="/shop">Shop</Link></li>
        <li className='navbar-links-list'><Link to="/cart">Cart ({cartItems.length})</Link></li>
        {user ? (
          <>
            <li><Link className='navbar-links-list' to="/profile">Hi, {user.name}</Link></li>
            {user.role === 'admin' && <li className='navbar-links-list'><Link to="/admin">Admin</Link></li>}
            <li className='navbar-links-list'><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li className='navbar-links-list'><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;