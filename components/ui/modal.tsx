import React, {FC, ReactElement, ReactNode} from "react";


type Props = {
  isOpen: boolean
  closeHandler: Function
  children: ReactElement
}
const Modal: FC<Props> = ({children, isOpen, closeHandler}) => {
  const openStyle =( isOpen ? "opacity-100" : "opacity-0 pointer-events-none -z-60")+" "+"flex items-center justify-center w-full h-full fixed inset-0 "
  return (
      <section className={openStyle}>
          <div className="z-0 absolute inset-0 bg-black/70 w-full h-full" onClick={closeHandler}></div>
          <div className="z-10">
            {children}
          </div>
      </section>
  )
}

export default Modal