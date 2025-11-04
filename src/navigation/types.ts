import { Country } from '../api/types';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    country: Country;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

