import React from "react";
import MultiLevelRMSelect from "../../MultiLevelRMSelect";
import AlertProvider from "../../alert/AlertProvider";
import ARNRIACode from "../../ArnRiaCode";
import LastTransactionUpdated from "./LastTransactionUpdated";

const RegulatoryCodeManagerSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-[20px] bg-gray-50 border-b-2">
            <AlertProvider>
                <ARNRIACode />
            </AlertProvider>
            <AlertProvider>
                <MultiLevelRMSelect />
            </AlertProvider>
            <LastTransactionUpdated />
        </div>
    )
}

export default RegulatoryCodeManagerSection;