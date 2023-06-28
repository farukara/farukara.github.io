import { useState, createContext, useContext } from "react";

const IsMenuOpenCtx = createContext();
const ToggleMenuCtx = createContext();

export function useIsOpenSmallMenu () {
  return useContext(IsMenuOpenCtx)
}

export function useToggleSmallMenu () {
  return useContext(ToggleMenuCtx);
}

export default function SmallScreenMenuProvider({children}) {
  const [isOpen, setIsOpen] = useState(false)

  // function toggleIsOpen() {
  //   setIsOpen(p => !p)
  // }
  return (
    <IsMenuOpenCtx.Provider value={isOpen}>
      <ToggleMenuCtx.Provider value={setIsOpen}> 
        {children}
      </ToggleMenuCtx.Provider> 
    </IsMenuOpenCtx.Provider>
  )
}
