import { create } from 'zustand';
import { DEFAULT_PROFILE, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, CERTIFICATES, PHOTOGRAPHY, LANGUAGES, ACHIEVEMENTS } from '../lib/defaultData';
import { Profile, Project, PhotoEntry, Language } from '../types';

interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experience: any[];
  education: any[];
  skills: any[];
  certificates: string[];
  photography: PhotoEntry[];
  languages: Language[];
  achievements: string[];
}

interface DataState {
  data: PortfolioData;
  draftData: PortfolioData | null;
  setDraftData: (newData: Partial<PortfolioData>) => void;
  saveDraft: () => void;
  discardDraft: () => void;
  publishDraft: () => Promise<void>;
  // For now, these load the defaults. In the future they might merge from Firebase
}

const initialData: PortfolioData = {
  profile: DEFAULT_PROFILE,
  projects: PROJECTS,
  experience: EXPERIENCE,
  education: EDUCATION,
  skills: SKILLS,
  certificates: CERTIFICATES,
  photography: PHOTOGRAPHY,
  languages: LANGUAGES,
  achievements: ACHIEVEMENTS,
};

export const useDataStore = create<DataState>((set, get) => ({
  data: initialData,
  draftData: null,
  setDraftData: (newData) => {
    set((state) => ({
      draftData: {
        ...(state.draftData || state.data),
        ...newData,
      }
    }));
  },
  saveDraft: () => {
    const { draftData } = get();
    if (draftData) {
      localStorage.setItem('portfolio_draft', JSON.stringify(draftData));
      console.log('Draft saved locally.');
    }
  },
  discardDraft: () => {
    localStorage.removeItem('portfolio_draft');
    set({ draftData: null });
  },
  publishDraft: async () => {
    const { draftData } = get();
    if (draftData) {
      // Simulate Firebase update
      // await updateDoc(doc(db, 'config', 'main'), draftData);
      set({ data: draftData, draftData: null });
      localStorage.removeItem('portfolio_draft');
      console.log('Draft published to production!');
    }
  }
}));
