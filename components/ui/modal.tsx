import React, {FC, ReactElement, ReactNode} from "react";


type Props = {
  closeHandler: ()=>void
  children: ReactElement
}
const Modal: FC<Props> = ({children, closeHandler}) => {
  return (
      <section className="flex items-center justify-center w-full h-full fixed inset-0 ">
          <div className="z-10 absolute inset-0 bg-black/70   w-full h-full" onClick={closeHandler}></div>
          <div className="z-10 relative">
            {children}
          </div>
      </section>
  )
}

export default Modal