# The Road to v2.0.0 (India Edition)

Based on your feedback, we are pivoting the **v2.0.0** roadmap. Instead of Spanish and Mandarin, VEDA Resume will now focus exclusively on **English** plus the major regional languages of **India**. 

This is a fantastic pivot that targets a massive, specific demographic. Here is the revised step-by-step versioning roadmap to get us to v2.0.0:

## User Review Required

India has 22 officially recognized languages. To ensure a high-quality initial release, I propose we start with **English + Top 5 Indian Languages** (Hindi, Bengali, Telugu, Marathi, Tamil). 
**Do you want to start with these 5, or do you want to attempt all 22 at once?**

---

## 🛣️ Version Progression Plan

### `v1.3.0` - The Localization Infrastructure
**Goal:** Prepare the React codebase for internationalization.
* **What to do:** Install `react-i18next`. Create the central `i18n.ts` configuration file. 
* **What to do:** Replace all hardcoded English text in the UI (e.g., `<h1>Upload Resume</h1>`) with translation keys (e.g., `<h1>{t('uploadTitle')}</h1>`).
* **What to do:** Create the primary `en.json` (English) dictionary.

### `v1.4.0` - The Hindi Integration & UI Switcher
**Goal:** Prove the multi-language system works with our first major regional language.
* **What to do:** Create `hi.json` and translate the English dictionary into Hindi (हिन्दी).
* **What to do:** Add a modern "Language Switcher" dropdown to the `Navbar.tsx`.
* **What to do:** Test the layout to ensure Devanagari script renders perfectly inside the cinematic UI without breaking heights or line-spacing.

### `v1.5.0` - The Backend AI Translation Engine
**Goal:** Ensure the AI actually writes the resume feedback in the selected regional language.
* **What to do:** Modify `api/review.ts` so the serverless function reads the user's selected language.
* **What to do:** Update the Gemini prompt dynamically. Example: *"Act as an expert ATS recruiter. The user speaks Hindi. You MUST write the fullyOptimizedResume and missingKeywords entirely in Hindi."*

### `v1.6.0` - The Regional Expansion
**Goal:** Add the remaining targeted Indian languages.
* **What to do:** Create dictionaries for Bengali (বাংলা), Telugu (తెలుగు), Marathi (मराठी), and Tamil (தமிழ்).
* **What to do:** Add these to the Navbar Language Switcher.

### `v2.0.0` - The "Make in India" Launch 🎉
**Goal:** The official major release of VEDA Resume India.
* **What to do:** Update the `README.md` to announce the completion of Milestone v2.0.
* **What to do:** Ensure the `Kanit` font (or a fallback font) beautifully supports all the complex regional scripts.
* **What to do:** Final GitHub release and Changelog update.
