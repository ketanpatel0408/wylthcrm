import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import MFTxnSummaryContent from "./MFTabsNavigation/MFTxnSummaryContent";
import CurrFYEarnings from "./MFTabsNavigation/CurrFYEarnings";

const MFTabsNavigation = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box className="bg-white shadow-md rounded-md">
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                className="bg-gray-200"
            >
                <Tab label="MF Txn. Summary" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="Curr. FY Earnings" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="Performance" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="SIP Reg. & Active" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="MF Readiness" className="!text-[13px] !text-black !normal-case !font-normal" />
            </Tabs>

            <Box className="p-4">
                {activeTab === 0 && <MFTxnSummaryContent /> }
                {activeTab === 1 && <CurrFYEarnings /> }
                {activeTab === 2 && <div>Performance Content</div>}
                {activeTab === 3 && <div>SIP Reg. & Active Content</div>}
                {activeTab === 4 && <div>MF Readiness Content</div>}
            </Box>
        </Box>
    );
}

export default MFTabsNavigation;