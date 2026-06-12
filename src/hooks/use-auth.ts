function signup(name: string, phoneNumber: string, password: string) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const userExists = users[phoneNumber];
  if (userExists) {
    throw new Error("User already exists");
  }
  users[phoneNumber] = { name, phoneNumber, password };
  localStorage.setItem("users", JSON.stringify(users));
}

function login(phoneNumber: string, password: string) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[phoneNumber];
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValid = user["password"] === password;
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  sessionStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  sessionStorage.removeItem("user");
}

export function useAuth() {
  const user = sessionStorage.getItem("user");
  return {
    user: user,
    signup: signup,
    login: login,
    logout: logout,
  };
}
