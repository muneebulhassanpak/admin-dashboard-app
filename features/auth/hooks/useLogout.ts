import { useState } from 'react';
import { logoutAction } from '../actions/authActions';

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);

    // Add small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      // Server action handles cookie clearing and redirect
      await logoutAction();
    } catch (error) {
      // Redirect happens in server action, so error unlikely
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
  };
}
