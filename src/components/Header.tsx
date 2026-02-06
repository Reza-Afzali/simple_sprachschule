import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const { state } = useCart();
  const totalPersons = state.items.reduce((s, it) => s + it.persons, 0);

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/">Sprachschule</Link>
        </div>
        <nav className="nav">
          <Link to="/courses">Kurse</Link>
          <Link to="/prices">Preise</Link>
          <Link to="/">Home</Link>
        </nav>
        <div className="cart-indicator">
          <Link to="/prices">Warenkorb</Link>
          <span className="badge">{totalPersons}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
