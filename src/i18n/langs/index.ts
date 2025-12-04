import enTranslations from "./en";
import esTranslations from "./es"
import frTranslations from "./fr"

// we use the lang en for the source of truth for typescript
const en : typeof frTranslations = enTranslations;
const es : typeof frTranslations = esTranslations;
const fr : typeof frTranslations = frTranslations;

export default { en, es, fr }
