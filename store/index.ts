import { Store as PullStateStore } from "pullstate";

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  settings: {
    enableNotifications: true,
  },
});

export default Store;
