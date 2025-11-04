import {
  formatNumber,
  formatPopulation,
  formatArea,
  filterCountriesByName,
} from '../../src/utils/helpers';
import { Country } from '../../src/api/types';
import countriesMock from '../../__mocks__/countriesMock.json';

const mockCountries = countriesMock as Country[];

describe('helpers', () => {
  describe('formatNumber', () => {
    it('should format number with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(123456789)).toBe('123,456,789');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(42)).toBe('42');
      expect(formatNumber(999)).toBe('999');
    });
  });

  describe('formatPopulation', () => {
    it('should format population number', () => {
      expect(formatPopulation(67391582)).toBe('67,391,582');
      expect(formatPopulation(1000000)).toBe('1,000,000');
    });
  });

  describe('formatArea', () => {
    it('should format area with unit', () => {
      expect(formatArea(551695)).toBe('551,695 km²');
      expect(formatArea(1000)).toBe('1,000 km²');
    });
  });

  describe('filterCountriesByName', () => {
    it('should return all countries when search term is empty', () => {
      const result = filterCountriesByName(mockCountries, '');
      expect(result).toEqual(mockCountries);
    });

    it('should return all countries when search term is only whitespace', () => {
      const result = filterCountriesByName(mockCountries, '   ');
      expect(result).toEqual(mockCountries);
    });

    it('should filter by common name (case-insensitive)', () => {
      const result = filterCountriesByName(mockCountries, 'france');
      expect(result).toHaveLength(1);
      expect(result[0].name.common).toBe('France');
    });

    it('should filter by official name (case-insensitive)', () => {
      const result = filterCountriesByName(mockCountries, 'republic');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty array when no match found', () => {
      const result = filterCountriesByName(mockCountries, 'xyzabc');
      expect(result).toHaveLength(0);
    });

    it('should handle partial matches', () => {
      const result = filterCountriesByName(mockCountries, 'ger');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(c => c.name.common.includes('Germany'))).toBe(true);
    });
  });
});

