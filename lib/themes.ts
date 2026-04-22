export type Theme = 'slate' | 'blue' | 'emerald' | 'rose' | 'amber' | 'purple';
export type Mode = 'light' | 'dark';

export const themes: Record<Theme, { name: string; color: string }> = {
  slate: { name: 'Slate', color: 'bg-slate-600' },
  blue: { name: 'Blue', color: 'bg-blue-600' },
  emerald: { name: 'Emerald', color: 'bg-emerald-600' },
  rose: { name: 'Rose', color: 'bg-rose-600' },
  amber: { name: 'Amber', color: 'bg-amber-600' },
  purple: { name: 'Purple', color: 'bg-purple-600' },
};

export const getThemeClass = (theme: Theme): string => {
  const themeMap: Record<Theme, string> = {
    slate: 'theme-slate',
    blue: 'theme-blue',
    emerald: 'theme-emerald',
    rose: 'theme-rose',
    amber: 'theme-amber',
    purple: 'theme-purple',
  };
  return themeMap[theme];
};
