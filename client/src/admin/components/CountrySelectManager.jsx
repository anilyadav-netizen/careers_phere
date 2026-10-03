// src/admin/components/CountrySelectManager.jsx
import {
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { COUNTRIES, getFlagByCountryName } from "../../constants/countries";

export const CountrySelectManager = ({ countries = [], onChange }) => {
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [customFlagUrl, setCustomFlagUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  // When admin selects a country from the dropdown
  const handleDropdownSelect = (e) => {
    const countryName = e.target.value;
    setSelectedCountryName(countryName);
    setImageError(false);

    if (countryName) {
      const matched = COUNTRIES.find(
        (c) => c.name.toLowerCase() === countryName.toLowerCase(),
      );
      if (matched) {
        setCustomFlagUrl(matched.flag);
      } else {
        const flag = getFlagByCountryName(countryName);
        setCustomFlagUrl(flag || "");
      }
    } else {
      setCustomFlagUrl("");
    }
  };

  // Add country to list
  const handleAddCountry = () => {
    const trimmedName = selectedCountryName.trim();
    if (!trimmedName) return;

    // Check if already in list
    const alreadyExists = countries.some(
      (c) =>
        (c.name || c.countryName || "").toLowerCase() ===
        trimmedName.toLowerCase(),
    );

    if (alreadyExists) return;

    // Resolve flag: either custom URL entered or Flagcdn URL
    let finalFlag = customFlagUrl.trim();
    if (!finalFlag) {
      finalFlag = getFlagByCountryName(trimmedName);
    }

    const newEntry = {
      name: trimmedName,
      countryName: trimmedName,
      flag: finalFlag,
    };

    onChange([...countries, newEntry]);

    // Reset inputs
    setSelectedCountryName("");
    setCustomFlagUrl("");
    setImageError(false);
  };

  const handleRemoveCountry = (indexToRemove) => {
    const updated = countries.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const currentPreviewFlag =
    customFlagUrl.trim() ||
    (selectedCountryName ? getFlagByCountryName(selectedCountryName) : "");

  return (
    <div className="space-y-4">
      {/* List of currently added countries */}
      {countries.length > 0 && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-slate-600">
            Added Countries ({countries.length}):
          </p>
          <div className="flex flex-wrap gap-2.5">
            {countries.map((c, index) => {
              const countryName = c.name || c.countryName || "Unknown";
              const flag = c.flag || getFlagByCountryName(countryName);

              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 transition hover:border-blue-300"
                >
                  {flag &&
                  (flag.startsWith("http://") ||
                    flag.startsWith("https://")) ? (
                    <img
                      src={flag}
                      alt={countryName}
                      className="w-5 h-3.5 object-cover rounded-xs border border-slate-200 shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Globe2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  )}
                  <span>{countryName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCountry(index)}
                    className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1"
                    title="Remove country"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Country Selection & Flagcdn Input Area */}
      <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Quick Select from Countries with Flagcdn */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Country (Flagcdn Auto-Fill)
            </label>
            <select
              value={selectedCountryName}
              onChange={handleDropdownSelect}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800"
            >
              <option value="">Choose a country or type below...</option>
              {COUNTRIES.map((country) => (
                <option key={country.code + country.name} value={country.name}>
                  {country.emoji ? `${country.emoji} ` : ""}
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Or type custom country name */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Or Custom Country Name
            </label>
            <input
              type="text"
              placeholder="e.g., Brazil, Netherlands..."
              value={selectedCountryName}
              onChange={(e) => {
                setSelectedCountryName(e.target.value);
                setImageError(false);
                if (e.target.value) {
                  const flag = getFlagByCountryName(e.target.value);
                  if (flag) setCustomFlagUrl(flag);
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800"
            />
          </div>
        </div>

        {/* Flag URL input (Flagcdn link or manual link) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">
              Flagcdn Image URL (Auto-loaded or Paste Custom Flag Link)
            </label>
            <a
              href="https://flagcdn.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>Browse Flagcdn.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Flag Preview Box */}
            <div className="w-10 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
              {currentPreviewFlag && !imageError ? (
                <img
                  src={currentPreviewFlag}
                  alt="Flag Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <ImageIcon className="w-4 h-4 text-slate-300" />
              )}
            </div>

            <input
              type="url"
              placeholder="https://flagcdn.com/w160/us.png"
              value={customFlagUrl}
              onChange={(e) => {
                setCustomFlagUrl(e.target.value);
                setImageError(false);
              }}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800"
            />

            <button
              type="button"
              disabled={!selectedCountryName.trim()}
              onClick={handleAddCountry}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Country</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Flagcdn format:{" "}
            <code className="text-slate-600 bg-slate-100 px-1 py-0.5 rounded">
              https://flagcdn.com/w160/[code].png
            </code>{" "}
            (e.g. <span className="text-slate-600">in, us, gb, ca, de, ae</span>
            )
          </p>
        </div>
      </div>
    </div>
  );
};
