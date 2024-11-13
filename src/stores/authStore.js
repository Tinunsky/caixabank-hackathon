import { atom } from "nanostores";
const currentUser = localStorage.getItem("currentUser");

export const authStore = atom({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: currentUser || null,
});

if (process.env.NODE_ENV === "development") {
  window.authStore = authStore;
}

export const login = (userData) => {
  authStore.set({ isAuthenticated: true, user: userData });
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(userData));
};

export const logout = () => {
  authStore.set({ isAuthenticated: false, user: null });
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
};
