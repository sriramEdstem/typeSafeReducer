"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increment = increment;
exports.setText = setText;
function increment(payload) {
    return { type: "INCREMENT", payload };
}
function setText(payload) {
    return { type: "SET_TEXT", payload };
}
function createReducer(initialState, handlers) {
    return (state = initialState, action) => {
        const handler = handlers[action.type];
        if (!(action.type in handlers)) {
            throw new Error("Invalid action type");
        }
        return handler ? handler(state, action) : state;
    };
}
// Usage:
const reducer = createReducer({ count: 0, text: "" }, {
    INCREMENT: (state, action) => (Object.assign(Object.assign({}, state), { count: state.count + action.payload })),
    SET_TEXT: (state, action) => (Object.assign(Object.assign({}, state), { text: action.payload })),
});
// Should work:
reducer(undefined, { type: "INCREMENT", payload: 5 });
// Should show type error:
reducer(undefined, { type: "INVALID", payload: true });
