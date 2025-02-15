import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from '@mui/material';

const NestedTable = ({ data, depth = 0, onToggle }) => {
    return (
        <TableContainer className="border rounded-lg">
            <Table size="small" className="w-full">
                {!depth === 0 && (
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell>Menu Items</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                )}
                <TableBody>
                    {data.map((row) => {
                        const hasChildren = row.children?.length > 0;
                        return (
                            <React.Fragment key={row.id}>
                                {console.log(depth, data, "depth")}
                                <TableRow className={`${depth % 2 === 0 ? `${depth === 0 ? "bg-blue-700" : "bg-white"}` : "bg-gray-50"} `}>
                                    <TableCell style={{ paddingLeft: `${16 + depth * 1}px` }}>
                                        <div className={`flex items-center ${depth === 0 && "text-[16px] font-semibold text-white"}`}>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {!row.disable &&
                                            <Switch
                                                color="primary"
                                                checked={row.active || false}
                                                onChange={() => onToggle(row.id, row.active)}
                                            />
                                        }
                                    </TableCell> 
                                </TableRow>
                                {hasChildren && (
                                    <TableRow>
                                        <TableCell colSpan={2} className="p-0 border-b-0">
                                            <NestedTable data={row.children} depth={depth + 1} onToggle={onToggle} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const initialData = [
    {
        id: '1',
        name: 'Dashboard',
        active: true,
        disable: true,
        children: [
            {
                id: '1-1',
                name: 'Code Relationship Manager Section',
                active: true,
                children: [
                    {
                        id: '1-1-1',
                        name: 'Code (ARN/RIA)',
                        active: true,
                    },
                    {
                        id: '1-1-2',
                        name: 'Relationship Manager',
                        active: true,
                    },
                    {
                        id: '1-1-3',
                        name: 'Last Transaction Updated On',
                        active: true,
                    }
                ]
            }
        ],
    },
];

const toggleAll = (data, newActive) => {
    return data.map(item => ({
        ...item,
        active: newActive,
        children: item.children ? toggleAll(item.children, newActive) : item.children,
    }));
};

const toggleNode = (data, id, newActive) => {
    return data.map(item => {
        if (item.id === id) {
            return {
                ...item,
                active: newActive,
                children: item.children ? toggleAll(item.children, newActive) : item.children,
            };
        } else if (item.children) {
            return {
                ...item,
                children: toggleNode(item.children, id, newActive),
            };
        }
        return item;
    });
};

const updateActiveStatus = (nodes) => {
    return nodes.map(node => {
        if (node.children && node.children.length > 0) {
            const updatedChildren = updateActiveStatus(node.children);
            return {
                ...node,
                children: updatedChildren,
                active: updatedChildren.every(child => child.active),
            };
        } else {
            return node;
        }
    });
};

const MenuManagement = () => {
    const [menuData, setMenuData] = useState(initialData);

    const handleToggle = (id, currentState) => {
        const newActive = !currentState;
        setMenuData(prevData => {
            const toggledData = toggleNode(prevData, id, newActive);
            return updateActiveStatus(toggledData);
        });
    };

    const areAllSelected = (data) => {
        return data.every(item => {
            if (!item.active) return false;
            if (item.children) return areAllSelected(item.children);
            return true;
        });
    };

    const handleSelectAll = (event) => {
        const newActive = event.target.checked;
        setMenuData(prevData => {
            const toggledData = toggleAll(prevData, newActive);
            return updateActiveStatus(toggledData);
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
            <div className="mb-4 flex justify-end items-center">
                <div className="flex items-center">
                    <span className="ml-2">Select All</span>
                    <Switch
                        color="primary"
                        checked={areAllSelected(menuData)}
                        onChange={handleSelectAll}
                    />
                </div>
            </div>
            <NestedTable data={menuData} onToggle={handleToggle} />
        </div>
    );
}

export default MenuManagement;