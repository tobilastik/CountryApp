import { renderHook, act } from '@testing-library/react-native';
import { useSearch } from '../../src/hooks/useSearch';

describe('useSearch', () => {
  it('should initialize with empty search term', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchTerm).toBe('');
  });

  it('should update search term', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchTerm('France');
    });

    expect(result.current.searchTerm).toBe('France');
  });

  it('should clear search term', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchTerm('France');
    });

    act(() => {
      result.current.setSearchTerm('');
    });

    expect(result.current.searchTerm).toBe('');
  });
});
