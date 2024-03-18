import { ReactNode } from "react";

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

// export  interface HeaderProps {
//     onLogout: () => void;
//   }

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthenticatedRoutesProps {
  children: React.ReactNode;
}

export type SetCountriesType = React.Dispatch<React.SetStateAction<Country[]>>;

