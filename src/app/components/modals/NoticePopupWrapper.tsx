"use client";

import React, { useState, useEffect } from "react";
import NoticePopup from "./NoticePopup";

interface NoticePopupWrapperProps {
 onClose: () => void;
}

const NoticePopupWrapper: React.FC<NoticePopupWrapperProps> = ({ onClose }) => {
 const [showPopup, setShowPopup] = useState(true);

 const handleClose = () => {
  setShowPopup(false);
  onClose();
 };

 if (!showPopup) return null;

 return <NoticePopup onClose={handleClose} />;
};

export default NoticePopupWrapper;
