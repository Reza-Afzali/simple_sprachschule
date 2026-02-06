import React from "react";
import { Course } from "../types";

type Props = {
  course: Course;
  currentPersons: number;
  currentWithAccommodation: boolean;
  onChangeSelection: (persons: number, withAccommodation: boolean) => void;
};

const CourseCard: React.FC<Props> = ({
  course,
  currentPersons,
  currentWithAccommodation,
  onChangeSelection,
}) => {
  return (
    <div className="course-card">
      <img
        className="course-img"
        // src={course.img ?? "https://via.placeholder.com/160x100"}
        alt={course.title}
      />
      <div className="course-body">
        <h3>
          {course.title} <small>({course.level})</small>
        </h3>
        <p className="course-desc">{course.description}</p>
        <div className="muted">Preis pro Person: €{course.pricePerPerson}</div>
        <div className="muted">
          Laufzeit: {course.durationMonths}{" "}
          {course.durationMonths > 1 ? "Monate" : "Monat"}
        </div>

        <div className="controls">
          <div className="counter">
            <button
              onClick={() =>
                onChangeSelection(
                  Math.max(0, currentPersons - 1),
                  currentWithAccommodation
                )
              }
            >
              -
            </button>
            <div className="count">{currentPersons}</div>
            <button
              onClick={() =>
                onChangeSelection(currentPersons + 1, currentWithAccommodation)
              }
            >
              +
            </button>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={currentWithAccommodation}
              onChange={(e) =>
                onChangeSelection(currentPersons, e.target.checked)
              }
            />
            Unterkunft (+€500 / Monat)
          </label>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
