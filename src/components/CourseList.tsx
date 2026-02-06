import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { Course } from "../types";
import { v4 as uuid } from "uuid";
import { useCart } from "../context/CartContext";

/**
 * initialCourses provided by page. This component manages the UI for
 * adding special course and per-course person/accommodation selection.
 */

type Props = { initialCourses: Course[] };

const CourseList: React.FC<Props> = ({ initialCourses }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const { dispatch } = useCart();

  // track selection per course locally
  const [selection, setSelection] = useState<
    Record<string, { persons: number; withAccommodation: boolean }>
  >(() =>
    initialCourses.reduce((acc, c) => {
      acc[c.id] = { persons: 0, withAccommodation: false };
      return acc;
    }, {} as Record<string, { persons: number; withAccommodation: boolean }>)
  );

  function addSpecialCourse(title: string, description: string) {
    const newCourse: Course = {
      id: uuid(),
      level: "Special",
      title,
      description,
      pricePerPerson: 1200,
      durationMonths: 1,
    };
    setCourses((prev) => [newCourse, ...prev]);
    setSelection((prev) => ({
      ...prev,
      [newCourse.id]: { persons: 0, withAccommodation: false },
    }));
  }

  function onChange(
    courseId: string,
    persons: number,
    withAccommodation: boolean
  ) {
    setSelection((prev) => ({
      ...prev,
      [courseId]: { persons, withAccommodation },
    }));
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    if (persons === 0) {
      dispatch({ type: "REMOVE_ITEM", payload: { courseId } });
    } else {
      dispatch({
        type: "ADD_OR_UPDATE_ITEM",
        payload: {
          courseId,
          title: course.title,
          level: course.level,
          persons,
          withAccommodation,
          pricePerPerson: course.pricePerPerson,
          durationMonths: course.durationMonths,
        },
      });
    }
  }

  return (
    <div className="course-list">
      <section className="special-create">
        <h3>Spezialkurs anlegen</h3>
        <SpecialCourseForm onCreate={addSpecialCourse} />
      </section>

      <section className="courses-grid">
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            currentPersons={selection[c.id]?.persons ?? 0}
            currentWithAccommodation={
              selection[c.id]?.withAccommodation ?? false
            }
            onChangeSelection={(persons, withAccommodation) =>
              onChange(c.id, persons, withAccommodation)
            }
          />
        ))}
      </section>
    </div>
  );
};

export default CourseList;

const SpecialCourseForm: React.FC<{
  onCreate: (title: string, desc: string) => void;
}> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Bitte Überschrift eingeben");
      return;
    }
    onCreate(title.trim(), desc.trim());
    setTitle("");
    setDesc("");
  }

  return (
    <form className="special-form" onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Überschrift"
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Beschreibung"
      />
      <button type="submit">Anlegen</button>
    </form>
  );
};
