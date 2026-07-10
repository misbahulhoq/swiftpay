export type Profile = {
  name: string;
  phoneNumber: string;
  password: string;
};

export const useProfile = (): Profile | undefined => {
  if (typeof window !== "undefined") {
    return JSON.parse(
      sessionStorage.getItem("swiftpay_user") || "null",
    ) as Profile;
  }
};

export const updateProfile = (profile: Partial<Profile>) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(
      sessionStorage.getItem("swiftpay_user") || "null",
    ) as Profile | null;
    const users = JSON.parse(
      localStorage.getItem("swiftpay_users") || "null",
    ) as Record<string, Profile> | null;

    if (user) {
      localStorage.setItem(
        "swiftpay_users",
        JSON.stringify({
          ...users,
          [user?.phoneNumber]: { ...user, ...profile },
        }),
      );
      sessionStorage.setItem(
        "swiftpay_user",
        JSON.stringify({ ...user, ...profile }),
      );
    }
  }
};
