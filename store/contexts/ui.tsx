import { createContext, ReactNode, RefObject, useRef } from 'react'

type ContextType = {
  containerRef: RefObject<HTMLDivElement>;
};

export const UIContext = createContext<ContextType | undefined>(undefined)

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef(null)

  return (
    <UIContext.Provider value={{ containerRef }}>{children}</UIContext.Provider>
  )
}
