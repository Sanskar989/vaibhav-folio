import { create } from 'zustand';

interface AdminState {
  isAdminUnlocked: boolean;
  unlockAdmin: (key: string) => void;
  lockAdmin: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdminUnlocked: false,
  unlockAdmin: (key: string) => {
    if (key === 'travel-admin-2026') {
      set({ isAdminUnlocked: true });
      console.log('✅ Admin Mode Unlocked. You can now edit the portfolio.');
    } else {
      console.error('❌ Invalid Admin Key');
    }
  },
  lockAdmin: () => {
    set({ isAdminUnlocked: false });
    console.log('🔒 Admin Mode Locked.');
  },
}));

if (typeof window !== 'undefined') {
  (window as any).unlockTravelAdmin = (key: string) => {
    useAdminStore.getState().unlockAdmin(key);
  };
}
