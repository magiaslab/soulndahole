export function createSlug(text: string) {
    return text.trim().toLowerCase()
        .replace(/\s+/g, '-') // Sostituisce spazi con -
        .replace(/[^a-z0-9-]/g, ''); // Rimuove caratteri non validi
} 