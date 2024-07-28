"use client";

import React, { useState } from "react";
import styles from "./UpdateBoard.module.css";
import Modal from "./Modal";
import { Update } from "../utils/getAllUpdateData";

interface UpdateBoardProps {
 updates: Update[];
}

const UpdateBoard: React.FC<UpdateBoardProps> = ({ updates }) => {
 const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
 const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

 const openModal = (update: Update) => {
  setSelectedUpdate(update);
  setIsModalOpen(true);
 };

 const closeModal = () => {
  setIsModalOpen(false);
  setSelectedUpdate(null);
 };

 return (
  <div className={styles.container}>
   <table className={styles.table}>
    <thead>
     <tr>
      <th className={styles.th}>Date</th>
      <th className={styles.th}>Content</th>
     </tr>
    </thead>
    <tbody>
     {updates.map((update, index) => (
      <tr
       key={update.date}
       className={styles.tr}
       onClick={() => openModal(update)}
      >
       <td className={styles.td}>{update.date.slice(5)}</td>
       <td className={styles.td}>이름 추가, 기능 업데이트</td>
      </tr>
     ))}
    </tbody>
   </table>
   {selectedUpdate && (
    <Modal isOpen={isModalOpen} onClose={closeModal} update={selectedUpdate} />
   )}
  </div>
 );
};

export default UpdateBoard;
