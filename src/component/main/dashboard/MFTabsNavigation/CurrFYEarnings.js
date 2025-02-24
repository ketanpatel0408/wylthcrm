import React from "react";
import { Typography } from "@mui/material";

const CurrFYEarnings = () => {
    const earningsData = [
        { id: "lblCurFYTarget", label: "Current FY Target", value: "₹2,00,000.00" },
        { id: "lblYTDTarget", label: "Y T D Target", value: "₹1,66,666.67" },
        { id: "lblYTDActual", label: "Y T D Actual", value: "₹0.00" },
        { id: "lblYTDAchievement", label: "Y T D Achievement (%)", value: "0.00%" },
        { id: "lblYTDBonus", label: "Y T D Bonus", value: "₹0.00" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earningsData.map((item) => (
                <div key={item.id} className="bg-white">
                    <Typography variant="h6" className="!font-bold !text-blue-500 !text-[14px] !mb-1 text-nowrap">
                        {item.value}
                    </Typography>
                    <Typography variant="body2" className="!text-black !text-[12px]">
                        {item.label}
                    </Typography>
                </div>
            ))}
        </div>
    );
};

export default CurrFYEarnings;