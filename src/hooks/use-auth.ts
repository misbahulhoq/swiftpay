function signup(name: string, phoneNumber: string, password: string) {
  const users = JSON.parse(localStorage.getItem("swiftpay_users") || "{}");
  const userExists = users[phoneNumber];
  if (userExists) {
    throw new Error("User already exists");
  }
  users[phoneNumber] = { name, phoneNumber, password };
  localStorage.setItem("swiftpay_users", JSON.stringify(users));
}

function login(phoneNumber: string, password: string) {
  const users = JSON.parse(localStorage.getItem("swiftpay_users") || "{}");
  const user = users[phoneNumber];
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValid = user["password"] === password;
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  sessionStorage.setItem("swiftpay_user", JSON.stringify(user));
}

function logout() {
  sessionStorage.removeItem("swiftpay_user");
}

export function useAuth() {
  const user = sessionStorage.getItem("swiftpay_user");
  return {
    user: user,
    signup: signup,
    login: login,
    logout: logout,
  };
}
