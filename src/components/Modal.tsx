import React, { ReactNode } from "react";
import './RegisterModal/style.css';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {

    if (!isOpen) return null;

    return (
        <section className="modal_section">
            {children}
        </section>
    )
}

export default Modal;