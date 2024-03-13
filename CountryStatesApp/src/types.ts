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

export  interface HeaderProps {
    isAuthenticated: boolean;
    onLogout: () => void;
  }

export type SetCountriesType = React.Dispatch<React.SetStateAction<Country[]>>;

