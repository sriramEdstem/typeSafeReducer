interface State {
  count: number;
  text: string;
}
type Action =
  | { type: "INCREMENT"; payload: number }
  | { type: "SET_TEXT"; payload: string };

export function increment(payload: number): Action {
  return { type: "INCREMENT", payload };
}
export function setText(payload: string): Action {
  return { type: "SET_TEXT", payload };
}

function createReducer<S, A extends { type: string; payload: any }>(
  initialState: S,
  handlers: {
    [K in A["type"]]: (state: S, action: Extract<A, { type: K }>) => S;
  }
) {
  return (state: S = initialState, action: A): S => {
    const handler = handlers[action.type as keyof typeof handlers];
    return handler ? handler(state, action as any) : state;
  };
}
// Usage:
const reducer = createReducer<State, Action>(
  { count: 0, text: "" },
  {
    INCREMENT: (state, action) => ({
      ...state,
      count: state.count + action.payload,
    }),
    SET_TEXT: (state, action) => ({
      ...state,
      text: action.payload,
    }),
  }
);

// Should work:
reducer(undefined, { type: "INCREMENT", payload: 5 });
// Should show type error:
reducer(undefined, { type: "INVALID", payload: true });
