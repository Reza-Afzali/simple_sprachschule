import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="page container">
      <h1>Willkommen zur Sprachschule</h1>
      <p>Wähle Kurse, lege Spezialkurse an und prüfe die Preisliste.</p>

      <div className="buttons">
        <Link className="btn" to="/courses">
          Zu den Kursen
        </Link>
        <Link className="btn outline" to="/prices">
          Preisliste
        </Link>
      </div>
    </div>
  );
};

export default Home;
