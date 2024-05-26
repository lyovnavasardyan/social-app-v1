import React, { ReactNode } from "react";
import './RegisterModal/style.css';

interface ModalProps {
    isOpen:boolean;
    children: ReactNode;
}

const Modal:React.Fc<ModalProps> = ({isOpen,children})=>{

    if(!isOpen) return null;

    return (
        <section className="modal_section">
        <div className = 'register_modal_div'>
             {children}
        </div>
        </section>
        )
}

export default Modal;