import axios, { type AxiosResponse } from 'axios';
import type {
  Character,
  CharacterResponse,
  SWAPIListResponse,
  SearchParams,
  APIError,
} from '../types/swapi';

const BASE_URL = 'https://www.swapi.tech/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const apiError: APIError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export class SWAPIService {
  static async getCharacters(params: SearchParams = {}): Promise<SWAPIListResponse<Character>> {
    try {
      const { page = 1, search } = params;
      let url = `/people?page=${page}&limit=10`;
      
      if (search) {
        url += `&name=${encodeURIComponent(search)}`;
      }

      const response = await apiClient.get(url);
      
      if (search) {
        const searchData = response.data;
        const characters = searchData.result.map((item: any) => ({
          uid: item.uid,
          name: item.properties.name,
          url: item.properties.url,
        }));
        
        return {
          message: searchData.message,
          total_records: characters.length,
          total_pages: 1,
          previous: null,
          next: null,
          results: characters,
        };
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCharacterDetails(uid: string): Promise<CharacterResponse> {
    try {
      const response = await apiClient.get<CharacterResponse>(`/people/${uid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async searchCharacters(query: string, page: number = 1): Promise<SWAPIListResponse<Character>> {
    return this.getCharacters({ search: query, page });
  }

  static async getCharacterByName(name: string): Promise<Character | null> {
    try {
      const response = await this.searchCharacters(name, 1);
      const exactMatch = response.results.find(
        char => char.name.toLowerCase() === name.toLowerCase()
      );
      return exactMatch || null;
    } catch (error) {
      return null;
    }
  }
}

export default SWAPIService; 