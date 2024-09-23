"use client";

import React, { useState, useMemo } from "react";
import styles from "./UpdateBoard.module.css";
import { Update } from "../types";
import NameUpdateModal from "./modals/NameUpdateModal";

interface UpdateBoardProps {
 updates: Update[];
}

const ITEMS_PER_PAGE = 3;

const UpdateBoard: React.FC<UpdateBoardProps> = ({ updates }) => {
 const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
 const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 const [currentPage, setCurrentPage] = useState(1);

 const sortedSelectedUpdate = useMemo(() => {
  if (selectedUpdate) {
   return {
    ...selectedUpdate,
    names: [...selectedUpdate.names].sort((a, b) => a.localeCompare(b)),
   };
  }
  return null;
 }, [selectedUpdate]);

 const pageCount = Math.ceil(updates.length / ITEMS_PER_PAGE);
 const paginatedUpdates = updates.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
 );

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
     {paginatedUpdates.map((update) => (
      <tr
       key={update.date}
       className={styles.tr}
       onClick={() => openModal(update)}
      >
       <td className={styles.td}>{update.date.slice(5)}</td>
       <td className={styles.td}>새로 추가된 이름</td>
      </tr>
     ))}
    </tbody>
   </table>
   <div className={styles.pagination}>
    <button
     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
     disabled={currentPage === 1}
    >
     &lt;
    </button>
    <span>
     {currentPage} / {pageCount}
    </span>
    <button
     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
     disabled={currentPage === pageCount}
    >
     &gt;
    </button>
   </div>
   {sortedSelectedUpdate && (
    <NameUpdateModal
     isOpen={isModalOpen}
     onClose={closeModal}
     update={sortedSelectedUpdate}
    />
   )}
  </div>
 );
};

export default UpdateBoard;
