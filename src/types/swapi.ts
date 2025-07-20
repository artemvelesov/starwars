export interface SWAPIListResponse<T> {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: T[];
}

export interface Character {
  uid: string;
  name: string;
  url: string;
}

export interface CharacterDetails {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CharacterResponse {
  message: string;
  result: {
    properties: CharacterDetails;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}

export interface EditableCharacterData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface StoredCharacter extends EditableCharacterData {
  uid: string;
  lastModified: string;
}

export interface SearchParams {
  page?: number;
  search?: string;
}

export interface APIError {
  message: string;
  status?: number;
}