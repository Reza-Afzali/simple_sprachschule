import React, { createContext, useContext, useReducer } from "react";
import { CartItem } from "../types";

type State = { items: CartItem[] };

type Action =
  | { type: "ADD_OR_UPDATE_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { courseId: string } }
  | { type: "CLEAR" };

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_OR_UPDATE_ITEM": {
      const exists = state.items.find(
        (i) => i.courseId === action.payload.courseId
      );
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.courseId === action.payload.courseId ? action.payload : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => i.courseId !== action.payload.courseId
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
