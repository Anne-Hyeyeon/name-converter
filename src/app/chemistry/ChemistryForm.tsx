"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./Chemistry.module.css";
import { NameData } from "../types";

interface ChemistryFormProps {
 nameData: NameData[];
}

const ChemistryForm: React.FC<ChemistryFormProps> = ({ nameData }) => {
 const [name1, setName1] = useState("");
 const [name2, setName2] = useState("");
 const router = useRouter();

 const names = useMemo(() => nameData.map((data) => data.name), [nameData]);

 const findFeelingNumber = (name: string): number | null => {
  const nameInfo = nameData.find(
   (data) => data.name.toLowerCase() === name.toLowerCase()
  );
  return nameInfo ? parseInt(nameInfo.feelingNum) : null;
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const feelingNum1 = findFeelingNumber(name1);
  const feelingNum2 = findFeelingNumber(name2);

  if (feelingNum1 && feelingNum2) {
   const resultNumber = `${feelingNum1}${feelingNum2}`;
   router.push(`/chemistry/result/${resultNumber}`);
  } else {
   alert(
    "One or both names were not found. Please check the spelling and try again."
   );
  }
 };

 return (
  <form onSubmit={handleSubmit} className={styles.form}>
   <div className={styles.inputWrapper}>
    <input
     type="text"
     value={name1}
     onChange={(e) => setName1(e.target.value)}
     placeholder="Enter first name"
     className={styles.input}
     list="nameList1"
     required
    />
    <datalist id="nameList1">
     {names.map((name, index) => (
      <option key={`name1-${index}`} value={name} />
     ))}
    </datalist>
   </div>
   <div className={styles.inputWrapper}>
    <input
     type="text"
     value={name2}
     onChange={(e) => setName2(e.target.value)}
     placeholder="Enter second name"
     className={styles.input}
     list="nameList2"
     required
    />
    <datalist id="nameList2">
     {names.map((name, index) => (
      <option key={`name2-${index}`} value={name} />
     ))}
    </datalist>
   </div>
   <button type="submit" className={styles.button}>
    Check Chemistry
   </button>
  </form>
 );
};

export default ChemistryForm;
