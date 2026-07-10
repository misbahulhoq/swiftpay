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
