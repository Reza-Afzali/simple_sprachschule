import React from "react";
import { useCart } from "../context/CartContext";

const ACCOMMODATION_PER_MONTH = 500;

const CartPreview: React.FC = () => {
  const { state, dispatch } = useCart();

  const total = state.items.reduce((s, i) => {
    const base = i.pricePerPerson * i.persons;
    const accom = i.withAccommodation
      ? ACCOMMODATION_PER_MONTH * i.durationMonths * i.persons
      : 0;
    return s + base + accom;
  }, 0);

  return (
    <aside className="cart-preview">
      <h4>Warenkorb</h4>
      {state.items.length === 0 ? (
        <div className="muted">Keine Artikel</div>
      ) : (
        <div className="cart-items">
          {state.items.map((i) => (
            <div className="cart-item" key={i.courseId}>
              <div>
                <div className="title">{i.title}</div>
                <div className="small">Teilnehmer: {i.persons}</div>
                <div className="small">
                  {i.withAccommodation ? "mit Unterkunft" : "ohne Unterkunft"}
                </div>
              </div>
              <div className="right">
                <div>
                  €
                  {i.pricePerPerson * i.persons +
                    (i.withAccommodation
                      ? ACCOMMODATION_PER_MONTH * i.durationMonths * i.persons
                      : 0)}
                </div>
                <button
                  className="tiny"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM",
                      payload: { courseId: i.courseId },
                    })
                  }
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="total">
        <div>Gesamt</div>
        <div className="total-amount">€{total}</div>
      </div>
    </aside>
  );
};

export default CartPreview;
