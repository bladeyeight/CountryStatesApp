export interface Country {
    id: number | undefined;
    code: string;
    name: string;
  }
  
export interface State {
    code: string;
    name: string;
    countryId: number;
  }

export type SetCountriesType = React.Dispatch<React.SetStateAction<Country[]>>;

