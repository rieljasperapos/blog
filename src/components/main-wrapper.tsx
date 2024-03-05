import React, { ReactNode } from "react";
const MainWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="items-center justify-center flex">
      {children}
    </div>
  )
}

export default MainWrapper;