import { useThemeContext } from "@context/ThemeContext/ThemeContext";

export const Preferences = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 pb-6 overflow-y-auto text-black dark:text-slate-100">
      <h1 className="w-full mb-6 text-4xl font-bold text-left">Preferences</h1>

      <section className="max-w-xl p-5 bg-white rounded-lg shadow dark:bg-slate-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Appearance</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Switch between light and dark mode. Your choice is saved after refresh.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-slate-300 transition dark:bg-blue-600"
          >
            <span
              className={`inline-block h-6 w-6 rounded-full bg-white shadow transition ${
                isDark ? "translate-x-9" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <p className="mt-4 text-sm font-semibold">
          Current theme: <span className="capitalize">{theme}</span>
        </p>
      </section>
    </div>
  );
};
