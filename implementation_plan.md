# The Road to v2.0.0 (India Edition)

Based on your feedback, we are pivoting the **v2.0.0** roadmap. Instead of Spanish and Mandarin, VEDA Resume will now focus exclusively on **English** plus the major regional languages of **India**. 

This is a fantastic pivot that targets a massive, specific demographic. Here is the revised step-by-step versioning roadmap to get us to v2.0.0:

## User Review Required

India has 22 officially recognized languages. To ensure a high-quality initial release, I propose we start with **English + Top 5 Indian Languages** (Hindi, Bengali, Telugu, Marathi, Tamil). 
**Do you want to start with these 5, or do you want to attempt all 22 at once?**

---

## 🛣️ Version Progression Plan

## 🛣️ Version Progression Plan

### Phase 1: Core Localization Infrastructure (v1.3.x)
* **`v1.3.0`**: Install `i18next` and `react-i18next` dependencies.
* **`v1.3.1`**: Create `src/lib/i18n.ts` base configuration.
* **`v1.3.2`**: Create the initial `src/locales/en.json` dictionary.
* **`v1.3.3`**: Extract Hero text and headers from `App.tsx`.
* **`v1.3.4`**: Extract navigation links from `Navbar.tsx`.
* **`v1.3.5`**: Extract file drop instructions from `UploadZone.tsx`.
* **`v1.3.6`**: Extract error states and validation text from `UploadZone.tsx`.
* **`v1.3.7`**: Extract rotating status messages from `LoadingState.tsx`.
* **`v1.3.8`**: Extract basic section labels from `ResultView.tsx`.
* **`v1.3.9`**: Extract complex string templates and tooltips from `ResultView.tsx`.

### Phase 2: Hindi Integration & UI Switcher (v1.4.x)
* **`v1.4.0`**: Create the `hi.json` (Hindi) dictionary file.
* **`v1.4.1`**: Translate Hero and Navbar strings to Hindi.
* **`v1.4.2`**: Translate Upload Zone and Loading states to Hindi.
* **`v1.4.3`**: Translate Result Dashboard labels to Hindi.
* **`v1.4.4`**: Implement language detection and state management.
* **`v1.4.5`**: Add a Language Switcher dropdown UI to `Navbar.tsx`.
* **`v1.4.6`**: Add language-specific flag icons or custom SVG graphics.
* **`v1.4.7`**: Integrate i18n instance into the main React tree (`main.tsx`).
* **`v1.4.8`**: CSS Audit: Adjust line-heights and padding for Devanagari script.
* **`v1.4.9`**: Comprehensive UI testing and mobile-responsive checks for Hindi.

### Phase 3: Backend AI Engine Update (v1.5.x)
* **`v1.5.0`**: Add a custom `X-User-Language` header to frontend `fetch` calls.
* **`v1.5.1`**: Parse the language header in `api/review.ts`.
* **`v1.5.2`**: Architect dynamic prompt generation based on language locale.
* **`v1.5.3`**: Write the localized Gemini system instructions for Hindi.
* **`v1.5.4`**: Schema Test: Ensure JSON keys remain English while values translate.
* **`v1.5.5`**: Add error-handling/fallback if the AI fails the translation.
* **`v1.5.6`**: Audit and test "Smart Rewrites" accuracy in Hindi.
* **`v1.5.7`**: Refine AI prompt to strictly output pure regional language (prevent 'Hinglish').
* **`v1.5.8`**: Optimize token usage and response latency for non-English generation.
* **`v1.5.9`**: End-to-end full system testing of the Hindi pipeline.

### Phase 4: Bengali Integration (v1.6.x)
* **`v1.6.0` - `v1.6.2`**: Create `bn.json` and translate UI components to Bengali.
* **`v1.6.3` - `v1.6.5`**: Update Navbar switcher and resolve UI spacing for Bengali script.
* **`v1.6.6` - `v1.6.8`**: Update AI backend prompt handlers for Bengali.
* **`v1.6.9`**: End-to-end full system testing for Bengali.

### Phase 5: Telugu Integration (v1.7.x)
* **`v1.7.0` - `v1.7.2`**: Create `te.json` and translate UI components to Telugu.
* **`v1.7.3` - `v1.7.5`**: Update Navbar switcher and resolve UI spacing for Telugu script.
* **`v1.7.6` - `v1.7.8`**: Update AI backend prompt handlers for Telugu.
* **`v1.7.9`**: End-to-end full system testing for Telugu.

### Phase 6: Marathi Integration (v1.8.x)
* **`v1.8.0` - `v1.8.2`**: Create `mr.json` and translate UI components to Marathi.
* **`v1.8.3` - `v1.8.5`**: Update Navbar switcher and test Marathi script rendering.
* **`v1.8.6` - `v1.8.8`**: Update AI backend prompt handlers for Marathi.
* **`v1.8.9`**: End-to-end full system testing for Marathi.

### Phase 7: Tamil Integration (v1.9.x)
* **`v1.9.0` - `v1.9.2`**: Create `ta.json` and translate UI components to Tamil.
* **`v1.9.3` - `v1.9.5`**: Update Navbar switcher and test Tamil script rendering.
* **`v1.9.6` - `v1.9.8`**: Update AI backend prompt handlers for Tamil.
* **`v1.9.9`**: Final typography audit across all 5 regional languages to ensure visual perfection.

### Phase 8: The "Make in India" Launch 🎉
* **`v2.0.0`**: Update the `README.md` to announce the completion of Milestone v2.0. Final GitHub release, Changelog update, and live deployment!
