import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocalStorageService } from '../../services/localStorageService';
import type { EditableCharacterData, StoredCharacter } from '../../types/swapi';


const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LocalStorageService', () => {
  const mockCharacterData: EditableCharacterData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  };

  const mockStoredCharacter: StoredCharacter = {
    uid: '1',
    ...mockCharacterData,
    lastModified: '2023-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getStoredCharacters', () => {
    it('should return empty object when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = LocalStorageService.getStoredCharacters();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('starwars_edited_characters');
      expect(result).toEqual({});
    });

    it('should return parsed characters from localStorage', () => {
      const storedData = { '1': mockStoredCharacter };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = LocalStorageService.getStoredCharacters();

      expect(result).toEqual(storedData);
    });

    it('should return empty object when JSON parsing fails', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = LocalStorageService.getStoredCharacters();

      expect(result).toEqual({});
      consoleSpy.mockRestore();
    });
  });

  describe('getStoredCharacter', () => {
    it('should return character when found', () => {
      const storedData = { '1': mockStoredCharacter };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = LocalStorageService.getStoredCharacter('1');

      expect(result).toEqual(mockStoredCharacter);
    });

    it('should return null when character not found', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({}));

      const result = LocalStorageService.getStoredCharacter('999');

      expect(result).toBeNull();
    });
  });

  describe('saveCharacter', () => {
    it('should save character data to localStorage', () => {
      const existingData = { '2': { ...mockStoredCharacter, uid: '2' } };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingData));

      LocalStorageService.saveCharacter('1', mockCharacterData);

      const expectedStoredData = {
        ...existingData,
        '1': {
          uid: '1',
          ...mockCharacterData,
          lastModified: '2023-01-01T00:00:00.000Z',
        },
      };

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'starwars_edited_characters',
        JSON.stringify(expectedStoredData)
      );
    });

    it('should handle localStorage errors when saving', () => {
      localStorageMock.getItem.mockReturnValue('{}');
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        LocalStorageService.saveCharacter('1', mockCharacterData);
      }).toThrow('Failed to save character data');
      consoleSpy.mockRestore();
    });
  });

  describe('deleteStoredCharacter', () => {
    it('should delete character from localStorage', () => {
      const existingData = {
        '1': mockStoredCharacter,
        '2': { ...mockStoredCharacter, uid: '2' },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingData));

      localStorageMock.setItem.mockImplementation(() => {});

      LocalStorageService.deleteStoredCharacter('1');

      const expectedData = { '2': { ...mockStoredCharacter, uid: '2' } };
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'starwars_edited_characters',
        JSON.stringify(expectedData)
      );
    });

    it('should handle localStorage errors when deleting', () => {
      localStorageMock.getItem.mockReturnValue('{}');
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        LocalStorageService.deleteStoredCharacter('1');
      }).toThrow('Failed to delete character data');
      consoleSpy.mockRestore();
    });
  });

  describe('isCharacterEdited', () => {
    it('should return true when character exists in storage', () => {
      const storedData = { '1': mockStoredCharacter };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = LocalStorageService.isCharacterEdited('1');

      expect(result).toBe(true);
    });

    it('should return false when character does not exist in storage', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({}));

      const result = LocalStorageService.isCharacterEdited('999');

      expect(result).toBe(false);
    });
  });

  describe('clearAllStoredCharacters', () => {
    it('should remove all stored characters', () => {
      LocalStorageService.clearAllStoredCharacters();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('starwars_edited_characters');
    });

    it('should handle localStorage errors when clearing', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        LocalStorageService.clearAllStoredCharacters();
      }).toThrow('Failed to clear character data');
      consoleSpy.mockRestore();
    });
  });

  describe('getEditedCharactersCount', () => {
    it('should return correct count of edited characters', () => {
      const storedData = {
        '1': mockStoredCharacter,
        '2': { ...mockStoredCharacter, uid: '2' },
        '3': { ...mockStoredCharacter, uid: '3' },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = LocalStorageService.getEditedCharactersCount();

      expect(result).toBe(3);
    });

    it('should return 0 when no characters are stored', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({}));

      const result = LocalStorageService.getEditedCharactersCount();

      expect(result).toBe(0);
    });
  });
}); 