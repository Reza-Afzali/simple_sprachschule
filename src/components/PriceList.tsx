import React from "react";
import { useCart } from "../context/CartContext";

const ACCOMMODATION_PER_MONTH = 500;

export const PriceList: React.FC = () => {
  const { state, dispatch } = useCart();

  const itemsWithTotals = state.items.map((i) => {
    const courseBase = i.pricePerPerson * i.persons;
    const accommodation = i.withAccommodation
      ? ACCOMMODATION_PER_MONTH * i.durationMonths * i.persons
      : 0;
    const total = courseBase + accommodation;
    return { ...i, courseBase, accommodation, total };
  });

  const grandTotal = itemsWithTotals.reduce((s, it) => s + it.total, 0);

  return (
    <div className="price-list">
      <h2>Preisliste</h2>
      {itemsWithTotals.length === 0 ? <p>Keine Kurse gewählt.</p> : null}

      <div className="items">
        {itemsWithTotals.map((it) => (
          <div className="price-item" key={it.courseId}>
            <div className="left">
              <div className="title">
                {it.title} ({it.level})
              </div>
              <div className="meta">
                Teilnehmer: {it.persons} · Laufzeit: {it.durationMonths}{" "}
                {it.durationMonths > 1 ? "Monate" : "Monat"}
              </div>
            </div>

            <div className="right">
              <div>Kurspreis: €{it.courseBase}</div>
              <div>Unterkunft: €{it.accommodation}</div>
              <div className="item-sum">Summe: €{it.total}</div>
              <button
                className="small"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: { courseId: it.courseId },
                  })
                }
              >
                Entfernen
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grand">
        <strong>Gesamtkosten:</strong>
        <div className="grand-amount">€{grandTotal}</div>
      </div>
    </div>
  );
};
