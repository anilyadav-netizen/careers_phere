// Single source of truth for countries and their Flagcdn flags across the project
export const FLAGCDN_BASE = "https://flagcdn.com";

export const getFlagcdnUrl = (code, size = "w160") => {
  if (!code) return "";
  const clean = code.trim().toLowerCase();
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  return `${FLAGCDN_BASE}/${size}/${clean}.png`;
};

export const COUNTRIES = [
  { name: "United States", code: "us", flag: "https://flagcdn.com/w320/us.png", emoji: "🇺🇸" },
  { name: "United Kingdom", code: "gb", flag: "https://flagcdn.com/w320/gb.png", emoji: "🇬🇧" },
  { name: "Canada", code: "ca", flag: "https://flagcdn.com/w320/ca.png", emoji: "🇨🇦" },
  { name: "Australia", code: "au", flag: "https://flagcdn.com/w320/au.png", emoji: "🇦🇺" },
  { name: "Germany", code: "de", flag: "https://flagcdn.com/w320/de.png", emoji: "🇩🇪" },
  { name: "India", code: "in", flag: "https://flagcdn.com/w320/in.png", emoji: "🇮🇳" },
  { name: "Netherlands", code: "nl", flag: "https://flagcdn.com/w320/nl.png", emoji: "🇳🇱" },
  { name: "Switzerland", code: "ch", flag: "https://flagcdn.com/w320/ch.png", emoji: "🇨🇭" },
  { name: "New Zealand", code: "nz", flag: "https://flagcdn.com/w320/nz.png", emoji: "🇳🇿" },
  { name: "Malaysia", code: "my", flag: "https://flagcdn.com/w320/my.png", emoji: "🇲🇾" },
  { name: "Singapore", code: "sg", flag: "https://flagcdn.com/w320/sg.png", emoji: "🇸🇬" },
  { name: "Indonesia", code: "id", flag: "https://flagcdn.com/w320/id.png", emoji: "🇮🇩" },
  { name: "Ireland", code: "ie", flag: "https://flagcdn.com/w320/ie.png", emoji: "🇮🇪" },
  { name: "Sweden", code: "se", flag: "https://flagcdn.com/w320/se.png", emoji: "🇸🇪" },
  { name: "Norway", code: "no", flag: "https://flagcdn.com/w320/no.png", emoji: "🇳🇴" },
  { name: "Denmark", code: "dk", flag: "https://flagcdn.com/w320/dk.png", emoji: "🇩🇰" },
  { name: "Finland", code: "fi", flag: "https://flagcdn.com/w320/fi.png", emoji: "🇫🇮" },
  { name: "Italy", code: "it", flag: "https://flagcdn.com/w320/it.png", emoji: "🇮🇹" },
  { name: "Spain", code: "es", flag: "https://flagcdn.com/w320/es.png", emoji: "🇪🇸" },
  { name: "UAE", code: "ae", flag: "https://flagcdn.com/w320/ae.png", emoji: "🇦🇪" },
  { name: "United Arab Emirates", code: "ae", flag: "https://flagcdn.com/w320/ae.png", emoji: "🇦🇪" },
  { name: "South Korea", code: "kr", flag: "https://flagcdn.com/w320/kr.png", emoji: "🇰🇷" },
  { name: "France", code: "fr", flag: "https://flagcdn.com/w320/fr.png", emoji: "🇫🇷" },
  { name: "Belgium", code: "be", flag: "https://flagcdn.com/w320/be.png", emoji: "🇧🇪" },
  { name: "Austria", code: "at", flag: "https://flagcdn.com/w320/at.png", emoji: "🇦🇹" },
  { name: "Portugal", code: "pt", flag: "https://flagcdn.com/w320/pt.png", emoji: "🇵🇹" },
  { name: "Japan", code: "jp", flag: "https://flagcdn.com/w320/jp.png", emoji: "🇯🇵" },
  { name: "Bulgaria", code: "bg", flag: "https://flagcdn.com/w320/bg.png", emoji: "🇧🇬" },
  { name: "Albania", code: "al", flag: "https://flagcdn.com/w320/al.png", emoji: "🇦🇱" },
  { name: "Malta", code: "mt", flag: "https://flagcdn.com/w320/mt.png", emoji: "🇲🇹" },
  { name: "Slovakia", code: "sk", flag: "https://flagcdn.com/w320/sk.png", emoji: "🇸🇰" },
  { name: "Sri Lanka", code: "lk", flag: "https://flagcdn.com/w320/lk.png", emoji: "🇱🇰" },
  { name: "Hong Kong", code: "hk", flag: "https://flagcdn.com/w320/hk.png", emoji: "🇭🇰" },
  { name: "Poland", code: "pl", flag: "https://flagcdn.com/w320/pl.png", emoji: "🇵🇱" },
  { name: "Czech Republic", code: "cz", flag: "https://flagcdn.com/w320/cz.png", emoji: "🇨🇿" },
  { name: "Romania", code: "ro", flag: "https://flagcdn.com/w320/ro.png", emoji: "🇷🇴" },
  { name: "Hungary", code: "hu", flag: "https://flagcdn.com/w320/hu.png", emoji: "🇭🇺" },
  { name: "Greece", code: "gr", flag: "https://flagcdn.com/w320/gr.png", emoji: "🇬🇷" },
  { name: "Turkey", code: "tr", flag: "https://flagcdn.com/w320/tr.png", emoji: "🇹🇷" },
  { name: "Saudi Arabia", code: "sa", flag: "https://flagcdn.com/w320/sa.png", emoji: "🇸🇦" },
  { name: "Qatar", code: "qa", flag: "https://flagcdn.com/w320/qa.png", emoji: "🇶🇦" },
  { name: "Kuwait", code: "kw", flag: "https://flagcdn.com/w320/kw.png", emoji: "🇰🇼" },
  { name: "Oman", code: "om", flag: "https://flagcdn.com/w320/om.png", emoji: "🇴🇲" },
  { name: "Bahrain", code: "bh", flag: "https://flagcdn.com/w320/bh.png", emoji: "🇧🇭" },
  { name: "Israel", code: "il", flag: "https://flagcdn.com/w320/il.png", emoji: "🇮🇱" },
  { name: "Brazil", code: "br", flag: "https://flagcdn.com/w320/br.png", emoji: "🇧🇷" },
  { name: "Mexico", code: "mx", flag: "https://flagcdn.com/w320/mx.png", emoji: "🇲🇽" },
  { name: "Argentina", code: "ar", flag: "https://flagcdn.com/w320/ar.png", emoji: "🇦🇷" },
  { name: "Chile", code: "cl", flag: "https://flagcdn.com/w320/cl.png", emoji: "🇨🇱" },
  { name: "Colombia", code: "co", flag: "https://flagcdn.com/w320/co.png", emoji: "🇨🇴" },
  { name: "South Africa", code: "za", flag: "https://flagcdn.com/w320/za.png", emoji: "🇿🇦" },
  { name: "Egypt", code: "eg", flag: "https://flagcdn.com/w320/eg.png", emoji: "🇪🇬" },
  { name: "Nigeria", code: "ng", flag: "https://flagcdn.com/w320/ng.png", emoji: "🇳🇬" },
  { name: "Kenya", code: "ke", flag: "https://flagcdn.com/w320/ke.png", emoji: "🇰🇪" },
  { name: "Thailand", code: "th", flag: "https://flagcdn.com/w320/th.png", emoji: "🇹🇭" },
  { name: "Vietnam", code: "vn", flag: "https://flagcdn.com/w320/vn.png", emoji: "🇻🇳" },
  { name: "Philippines", code: "ph", flag: "https://flagcdn.com/w320/ph.png", emoji: "🇵🇭" },
  { name: "Taiwan", code: "tw", flag: "https://flagcdn.com/w320/tw.png", emoji: "🇹🇼" },
  { name: "Bangladesh", code: "bd", flag: "https://flagcdn.com/w320/bd.png", emoji: "🇧🇩" },
  { name: "Pakistan", code: "pk", flag: "https://flagcdn.com/w320/pk.png", emoji: "🇵🇰" },
  { name: "Nepal", code: "np", flag: "https://flagcdn.com/w320/np.png", emoji: "🇳🇵" },
];

export const getFlagByCountryName = (countryName) => {
  if (!countryName) return "";
  const normalized = countryName.toLowerCase().trim();
  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return countryName.trim();
  }
  const found = COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === normalized ||
      c.code.toLowerCase() === normalized ||
      (normalized === "usa" && c.code === "us") ||
      (normalized === "uk" && c.code === "gb")
  );
  if (found) return found.flag;

  // Fallback: if 2 letter country code
  if (normalized.length === 2) {
    return `https://flagcdn.com/w320/${normalized}.png`;
  }
  return "";
};
