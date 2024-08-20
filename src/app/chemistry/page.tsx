import React from "react";
import styles from "./Chemistry.module.css";
import getAllNameData from "../utils/getAllNameData";
import { NameData } from "../types";
import ChemistryForm from "./ChemistryForm";

export default async function ChemistryPage() {
 let nameData: NameData[] = [];
 let error: string | null = null;

 try {
  nameData = await getAllNameData();
 } catch (err) {
  console.error("Failed to fetch name data:", err);
  error = "Failed to load name data. Please try again later.";
 }

 return (
  <div className={styles.container}>
   <h1 className={styles.title}>이름 궁합 분석</h1>
   {error ? (
    <p className={styles.error}>{error}</p>
   ) : nameData.length === 0 ? (
    <p className={styles.loading}>Loading name data...</p>
   ) : (
    <ChemistryForm nameData={nameData} />
   )}
  </div>
 );
}
