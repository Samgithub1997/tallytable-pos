import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// 1️⃣ Define the shape of the context state
interface ExampleContextType {
  data: string;
  updateData: (newData: string) => void;
}

// 2️⃣ Create the Context with an initial undefined value
const ExampleContext = createContext<ExampleContextType | undefined>(undefined);

// 3️⃣ Create a Provider Component to wrap the app and provide state
export const ExampleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<string>("Initial Value"); // State managed inside the provider

  // Function to update the state
  const updateData = (newData: string) => {
    setData(newData);
  };

  return (
    <ExampleContext.Provider value={{ data, updateData }}>
      {children}
    </ExampleContext.Provider>
  );
};

// 4️⃣ Create a custom hook to use the context
export const useExample = (): ExampleContextType => {
  const context = useContext(ExampleContext);
  if (!context) {
    throw new Error("useExample must be used within an ExampleProvider");
  }
  return context;
};
