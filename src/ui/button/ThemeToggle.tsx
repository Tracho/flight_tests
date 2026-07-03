import { useThemeStore } from "@/store/useThemeStore";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
      {theme === 'light' ? '🌙 Темная' : '☀️ Светлая'}
    </button>
  );
};
