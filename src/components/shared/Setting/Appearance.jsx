import { useState, useEffect } from "react";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  Sparkles,
  Eye,
  Brush,
  Settings,
  RotateCcw,
  Save,
} from "lucide-react";

export default function Appearance() {
  const [settings, setSettings] = useState({
    theme: "light", // light, dark, system
    primaryColor: "blue",
    accentColor: "purple",
    fontSize: "medium",
    borderRadius: "medium",
    animations: true,
    customColors: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#1f2937",
    },
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Predefined color schemes
  const colorSchemes = [
    {
      name: "Ocean Blue",
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      id: "blue",
    },
    {
      name: "Forest Green",
      primary: "#10b981",
      secondary: "#059669",
      id: "green",
    },
    {
      name: "Sunset Orange",
      primary: "#f97316",
      secondary: "#ea580c",
      id: "orange",
    },
    {
      name: "Royal Purple",
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      id: "purple",
    },
    { name: "Rose Pink", primary: "#f43f5e", secondary: "#e11d48", id: "rose" },
    {
      name: "Emerald Teal",
      primary: "#14b8a6",
      secondary: "#0d9488",
      id: "teal",
    },
    {
      name: "Amber Gold",
      primary: "#f59e0b",
      secondary: "#d97706",
      id: "amber",
    },
    {
      name: "Indigo Navy",
      primary: "#6366f1",
      secondary: "#4f46e5",
      id: "indigo",
    },
  ];

  const themes = [
    {
      id: "light",
      name: "Light",
      icon: Sun,
      description: "Clean and bright interface",
    },
    { id: "dark", name: "Dark", icon: Moon, description: "Easy on the eyes" },
    {
      id: "system",
      name: "System",
      icon: Monitor,
      description: "Follows your device setting",
    },
  ];

  const fontSizes = [
    { id: "small", name: "Small", size: "14px", description: "Compact text" },
    {
      id: "medium",
      name: "Medium",
      size: "16px",
      description: "Standard size",
    },
    { id: "large", name: "Large", size: "18px", description: "Easier to read" },
  ];

  const borderRadiuses = [
    {
      id: "none",
      name: "Sharp",
      radius: "0px",
      description: "No rounded corners",
    },
    {
      id: "small",
      name: "Subtle",
      radius: "4px",
      description: "Slightly rounded",
    },
    {
      id: "medium",
      name: "Smooth",
      radius: "8px",
      description: "Moderately rounded",
    },
    {
      id: "large",
      name: "Curved",
      radius: "16px",
      description: "Very rounded",
    },
  ];

  // Apply settings to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const scheme = colorSchemes.find((s) => s.id === settings.primaryColor);

    if (scheme) {
      root.style.setProperty("--primary-color", scheme.primary);
      root.style.setProperty("--secondary-color", scheme.secondary);
    }

    // Apply custom colors if in custom mode
    if (settings.primaryColor === "custom") {
      root.style.setProperty("--primary-color", settings.customColors.primary);
      root.style.setProperty(
        "--secondary-color",
        settings.customColors.secondary
      );
      root.style.setProperty(
        "--background-color",
        settings.customColors.background
      );
      root.style.setProperty("--surface-color", settings.customColors.surface);
      root.style.setProperty("--text-color", settings.customColors.text);
    }

    // Apply theme
    root.classList.remove("light", "dark");
    if (settings.theme !== "system") {
      root.classList.add(settings.theme);
    }

    // Apply font size
    const fontSize = fontSizes.find((f) => f.id === settings.fontSize);
    if (fontSize) {
      root.style.setProperty("--base-font-size", fontSize.size);
    }

    // Apply border radius
    const borderRadius = borderRadiuses.find(
      (r) => r.id === settings.borderRadius
    );
    if (borderRadius) {
      root.style.setProperty("--border-radius", borderRadius.radius);
    }

    // Apply animations
    root.style.setProperty(
      "--animation-duration",
      settings.animations ? "200ms" : "0ms"
    );
  }, [settings]);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCustomColorChange = (colorKey, value) => {
    setSettings((prev) => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [colorKey]: value,
      },
    }));
  };

  const resetToDefaults = () => {
    setSettings({
      theme: "light",
      primaryColor: "blue",
      accentColor: "purple",
      fontSize: "medium",
      borderRadius: "medium",
      animations: true,
      customColors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        background: "#ffffff",
        surface: "#f8fafc",
        text: "#1f2937",
      },
    });
  };

  const saveSettings = () => {
    // Here you would typically save to localStorage or send to server
    localStorage.setItem("appearanceSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  const ColorPicker = ({ color, onChange, label }) => (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700 min-w-20">
        {label}
      </label>
      <div className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
        />
        <div
          className="absolute inset-0 rounded border border-gray-300 pointer-events-none"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-gray-500 font-mono">{color}</span>
    </div>
  );

  const PreviewCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Preview
      </h3>
      <div className="space-y-4">
        <button
          className="w-full px-4 py-2 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            borderRadius: "var(--border-radius)",
          }}
        >
          Primary Button
        </button>
        <button
          className="w-full px-4 py-2 border-2 rounded-lg font-medium transition-colors"
          style={{
            borderColor: "var(--primary-color)",
            color: "var(--primary-color)",
            borderRadius: "var(--border-radius)",
          }}
        >
          Secondary Button
        </button>
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "var(--surface-color, #f8fafc)",
            borderRadius: "var(--border-radius)",
          }}
        >
          <p
            className="text-gray-700 dark:text-gray-300"
            style={{ fontSize: "var(--base-font-size)" }}
          >
            This is how your text will appear with the current settings.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Palette className="text-purple-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Appearance
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              previewMode
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Eye size={16} />
            {previewMode ? "Exit Preview" : "Preview Mode"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Theme Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Theme
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSettingChange("theme", theme.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      settings.theme === theme.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-700"
                    }`}
                  >
                    <Icon
                      size={24}
                      className="mx-auto mb-2 text-gray-600 dark:text-gray-300"
                    />
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {theme.description}
                    </p>
                    {settings.theme === theme.id && (
                      <Check size={16} className="text-blue-600 mx-auto mt-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Schemes */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brush className="text-purple-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Color Scheme
                </h2>
              </div>
              <button
                onClick={() => setIsCustomizing(!isCustomizing)}
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                {isCustomizing ? "Use Presets" : "Custom Colors"}
              </button>
            </div>

            {!isCustomizing ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() =>
                      handleSettingChange("primaryColor", scheme.id)
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      settings.primaryColor === scheme.id
                        ? "border-gray-400 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex gap-1 mb-2">
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: scheme.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: scheme.secondary }}
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {scheme.name}
                    </p>
                    {settings.primaryColor === scheme.id && (
                      <Check
                        size={14}
                        className="text-green-600 mx-auto mt-1"
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <ColorPicker
                  color={settings.customColors.primary}
                  onChange={(color) =>
                    handleCustomColorChange("primary", color)
                  }
                  label="Primary"
                />
                <ColorPicker
                  color={settings.customColors.secondary}
                  onChange={(color) =>
                    handleCustomColorChange("secondary", color)
                  }
                  label="Secondary"
                />
                <ColorPicker
                  color={settings.customColors.background}
                  onChange={(color) =>
                    handleCustomColorChange("background", color)
                  }
                  label="Background"
                />
                <ColorPicker
                  color={settings.customColors.surface}
                  onChange={(color) =>
                    handleCustomColorChange("surface", color)
                  }
                  label="Surface"
                />
                <ColorPicker
                  color={settings.customColors.text}
                  onChange={(color) => handleCustomColorChange("text", color)}
                  label="Text"
                />
              </div>
            )}
          </div>

          {/* Typography */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Typography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSettingChange("fontSize", size.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    settings.fontSize === size.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-700"
                  }`}
                >
                  <div className="text-center">
                    <p
                      style={{ fontSize: size.size }}
                      className="font-medium mb-1"
                    >
                      Aa
                    </p>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {size.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {size.description}
                    </p>
                  </div>
                  {settings.fontSize === size.id && (
                    <Check size={16} className="text-blue-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <PreviewCard />

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={resetToDefaults}
              className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Reset to Defaults
            </button>
            <button
              onClick={saveSettings}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
