const UserLocalStorageRepository = {
  getAuth(): string | null {
    return localStorage.getItem("auth");
  },

  setAuth(value: 1 | 0): void {
    localStorage.setItem("auth", value.toString());
  },
};

export default UserLocalStorageRepository;
