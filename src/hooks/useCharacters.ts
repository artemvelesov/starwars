import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import SWAPIService from '../services/swapiService';
import type { SearchParams } from '../types/swapi';

export const useCharacters = (params: SearchParams = {}) => {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => SWAPIService.getCharacters(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCharacterSearch = (searchQuery: string, page: number = 1) => {
  return useQuery({
    queryKey: ['characters', 'search', searchQuery, page],
    queryFn: () => SWAPIService.searchCharacters(searchQuery, page),
    enabled: !!searchQuery.trim(),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCharacterDetails = (uid: string) => {
  return useQuery({
    queryKey: ['character', uid],
    queryFn: () => SWAPIService.getCharacterDetails(uid),
    enabled: !!uid,
    staleTime: 10 * 60 * 1000,
  });
};

export const useInfiniteCharacters = (searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ['characters', 'infinite', searchQuery],
    queryFn: ({ pageParam = 1 }) => 
      SWAPIService.getCharacters({ page: pageParam, search: searchQuery }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next, 'https://www.swapi.tech');
      const nextPage = url.searchParams.get('page');
      return nextPage ? parseInt(nextPage, 10) : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}; 