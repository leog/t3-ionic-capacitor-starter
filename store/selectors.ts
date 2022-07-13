import { createSelector } from "reselect";

const getState = (state: any) => state;

export const getSettings = createSelector(getState, (state) => state.settings);
