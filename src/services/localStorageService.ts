import type { StoredCharacter, EditableCharacterData } from '../types/swapi';

const STORAGE_KEY = 'starwars_edited_characters';

export class LocalStorageService {
  static getStoredCharacters(): Record<string, StoredCharacter> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      return {};
    }
  }

  static getStoredCharacter(uid: string): StoredCharacter | null {
    const storedCharacters = this.getStoredCharacters();
    return storedCharacters[uid] || null;
  }

  static saveCharacter(uid: string, characterData: EditableCharacterData): void {
    try {
      const storedCharacters = this.getStoredCharacters();

      const storedCharacter: StoredCharacter = {
        uid,
        ...characterData,
        lastModified: new Date().toISOString(),
      };

      storedCharacters[uid] = storedCharacter;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedCharacters));
    } catch (error) {
      throw new Error('Failed to save character data');
    }
  }

  static deleteStoredCharacter(uid: string): void {
    try {
      const storedCharacters = this.getStoredCharacters();
      delete storedCharacters[uid];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedCharacters));
    } catch (error) {
      throw new Error('Failed to delete character data');
    }
  }

  static isCharacterEdited(uid: string): boolean {
    const storedCharacter = this.getStoredCharacter(uid);
    return storedCharacter !== null;
  }

  static clearAllStoredCharacters(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      throw new Error('Failed to clear character data');
    }
  }

  static getEditedCharactersCount(): number {
    const storedCharacters = this.getStoredCharacters();
    return Object.keys(storedCharacters).length;
  }
}

