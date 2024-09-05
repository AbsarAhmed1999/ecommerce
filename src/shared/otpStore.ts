// src/shared/otpStore.ts
type OtpData = {
  otp: string;
  expires: number;
};

export let otpStore: { [key: string]: OtpData } = {};
