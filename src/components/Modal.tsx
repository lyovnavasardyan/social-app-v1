import React, { ReactNode } from "react";
import './modal.css';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    shouldShow: boolean;
    onRequestClose:void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({shouldShow ,onRequestClose, children }) => {

   return shouldShow? (
        <section className="modal_section">
             <IoClose className="close" onClick={onRequestClose}/>
            {children}
        </section>
    ):null
}

export default Modal;