export interface DemoAccountConfig {
  username?: string;
  email?: string;
  password?: string;
  note?: string;
  liveUrl: string;
}

export const demoAccounts: Record<string, DemoAccountConfig> = {
  bunkmate: {
    username: "bunkmatedemo",
    password: "123456",
    note: "Official Dedicated BunkMate Demo Account",
    liveUrl: "https://bunkmate-lilac.vercel.app/demo",
  },

  cardioguard: {
    email: "cardioguarddemo@gmail.com",
    password: "Demoaccount@123",
    note: "Official Dedicated CardioGuard AI Clinical Demo Account",
    liveUrl: "https://cardioguard20.vercel.app/demo",
  },

  atmosphere: {
    note: "Instant Public Search Access (No Login Required)",
    liveUrl: "https://atmosphere-ai-intelligent-search.vercel.app/demo",
  },
};
