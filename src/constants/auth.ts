// Simple simulated authentication session state for LocalMatch/Dgo
export const authSession: {
  isLoggedIn: boolean;
  role?: 'user' | 'business';
} = {
  isLoggedIn: false,
};
