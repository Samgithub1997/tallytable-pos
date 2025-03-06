import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the context
interface NavigationContextType {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  closeMobileNav: () => void;
}

// Create the context with undefined as default
const MarketNavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

// Provider component
interface MarketNavigationProviderProps {
  children: ReactNode;
}

export const MarketNavigationProvider: React.FC<
  MarketNavigationProviderProps
> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <MarketNavigationContext.Provider
      value={{ isMobileNavOpen, setIsMobileNavOpen, closeMobileNav }}
    >
      {children}
    </MarketNavigationContext.Provider>
  );
};

// Custom hook to use the navigation context
export const useMarketNavigation = () => {
  const context = useContext(MarketNavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
