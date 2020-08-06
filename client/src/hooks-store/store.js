import { useState, useEffect } from "react";

// shared in the entore application.
// exist only once.
// every file that imports from the this store.js will have access to the values stored in these variables.
let globalState = {};
let listeners = [];
let actions = {};
// these are defiend outside of useStore so that all components will use the same values.
// if these were to be defined within useStore then every file that imported store.js will use its own values.

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];
  const dispatch = (actionIdentifier, payload) => {
    // gets an actionIdentifier from a component, then checks for the action in actions and returns a new sate.
    const newState = actions[actionIdentifier](globalState, payload);
    //mergiing global state and new state; old data + new data.
    globalState = { ...globalState, ...newState };
    // inform all listeners about the state update.
    for (const listener of listeners) {
      listener(globalState);
    }
  };
  useEffect(() => {
    // adding setState function to listener for a component that uses this custom hook.
    if (shouldListen) {
      listeners.push(setState);
    }
    return () => {
      // removing listener when component unmounts
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);
  return [globalState, dispatch];
};

// function for setting actions
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
