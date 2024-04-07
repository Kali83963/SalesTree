import { cloneElement, createContext, useContext, useState } from "react"
import { createPortal } from "react-dom";
import useOutsideClick from "../utils/useOutsideClick";
import { XMarkIcon } from "@heroicons/react/24/outline";




const ModalContext = createContext();
function Modal({ children }) {
  const [openName , setOpenName] = useState("");

  const close = () => setOpenName("")
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{openName,close,open}}>
      {children}
    </ModalContext.Provider>
  )
}


function Open({ children, opens:opensWindowName }){
    const {open} = useContext(ModalContext);

    return cloneElement(children,{ onClick: ()=> open(opensWindowName)});
}

function Window({children,name}){
    const {openName,close} = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if(name !== openName) return null;

    return(
        createPortal(
            <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 z-50 flex items-center justify-center" ref={ref} style={{minWidth:'320px'}}>
                <div className="bg-white rounded-xl p-4 w-2/6 h-64 flex flex-col items-center gap-4">
                    <button onClick={close} className="text-red-500 w-7 self-end">
                        <XMarkIcon />
                    </button>
                <div>{cloneElement(children,{onClose:close})}</div>
                </div>
            </div>,
            document.body
        )
    )
};


Modal.Open = Open;
Modal.Window = Window;
export default Modal;