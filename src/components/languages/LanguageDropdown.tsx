import { useState } from "react";
import "./LanguageDropdown.css";

function LanguageDropdown() {
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "am", name: "Amharic" },
    { code: "ar", name: "Arabic" },
    { code: "om", name: "Afaan Oromo" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
  ];

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="language-dropdown">

      <select
        id="language"
        value={language}
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <p> {language}</p>
    </div>
  );
}

export default LanguageDropdown;