import Store from ".";

export const setSettings = (settings: { enableNotifications: boolean }) => {
  Store.update((s) => {
    s.settings = settings;
  });
};
