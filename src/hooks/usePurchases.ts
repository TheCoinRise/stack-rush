import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/stores/userStore';
import {
  initializePurchases,
  checkPremiumStatus,
  purchasePremium,
  restorePurchases,
} from '@/services/purchases';

/**
 * Custom hook for managing RevenueCat purchases
 */
export function usePurchases() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { isPremium, setPremium } = useUserStore();

  // Initialize RevenueCat on mount
  useEffect(() => {
    const init = async () => {
      await initializePurchases();
      setIsInitialized(true);

      // Check for existing premium status
      const hasPremium = await checkPremiumStatus();
      if (hasPremium && !isPremium) {
        setPremium(true);
      }
    };

    init();
  }, [isPremium, setPremium]);

  // Purchase premium
  const purchase = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await purchasePremium();
      if (success) {
        setPremium(true);
        return true;
      } else {
        setError('Purchase was cancelled');
        return false;
      }
    } catch (err) {
      setError('Purchase failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setPremium]);

  // Restore purchases
  const restore = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPremium = await restorePurchases();
      if (hasPremium) {
        setPremium(true);
        return true;
      } else {
        setError('No purchases found to restore');
        return false;
      }
    } catch (err) {
      setError('Restore failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setPremium]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isPremium,
    isLoading,
    error,
    isInitialized,
    purchase,
    restore,
    clearError,
  };
}
