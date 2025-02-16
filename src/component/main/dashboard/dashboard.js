import React from "react";
import RegulatoryCodeManagerSection from "./RegulatoryCodeManagerSection/RegulatoryCodeManagerSection";
import { useMenu } from "../MenuManagement/MenuContext";

const Dashboard = () => {
  const { menuData } = useMenu();

  const findMenuItem = (name, data) => {
    for (let item of data) {
      if (item.name === name) return item;
      if (item.children) {
        const found = findMenuItem(name, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div>
      {findMenuItem("Code Relationship Manager Section", menuData)?.active && (
        <RegulatoryCodeManagerSection />
      )}
    </div>
  );
};

export default Dashboard;