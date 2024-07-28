import React from "react";
import styles from "./Modal.module.css";
import { Update } from "../data/20240729";

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 update: Update;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, update }) => {
 if (!isOpen) return null;

 return (
  <div className={styles.modal} onClick={onClose}>
   <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
    <span className={styles.close} onClick={onClose}>
     &times;
    </span>
    <h3 className={styles.updateTitle}>{update.date} Update 💕👍</h3>
    <h3>Patch Notes:</h3>
    <ul>
     {update.patchNotes.map((note, index) => (
      <li key={index}>{note}</li>
     ))}
    </ul>
    <h3>업데이트된 이름:</h3>
    <div className={styles.nameList}>
     {update.names.map((name, index) => (
      <a
       key={index}
       className={styles.nameLink}
       href={`${process.env.NEXT_PUBLIC_API_URL}/result/${name}`}
       target="_blank"
       rel="noopener noreferrer"
      >
       {name}
      </a>
     ))}
    </div>
   </div>
  </div>
 );
};

export default Modal;
