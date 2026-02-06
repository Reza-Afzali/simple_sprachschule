import React from "react";
import { PriceList } from "../components/PriceList";
//import CartPreview from "../components/CartPreview";

const PricesPage: React.FC = () => {
  return (
    <div className="page container">
      <h2>Preise</h2>
      <PriceList />
      {/* <CartPreview /> */}
    </div>
  );
};

export default PricesPage;
