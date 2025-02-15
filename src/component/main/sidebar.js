import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { useSidebar } from './SidebarContext';

const menuItems = [
    {
        title: 'Dashboard',
        icon: 'fas fa-th-large',
        path: '/',
    },
    {
        title: 'Business Reports',
        icon: 'fas fa-file-chart-line',
        children: [
            {
                title: 'Business & Revenue',
                children: [
                    {
                        title: 'Broker Income',
                        path: '/Report/BrokerIncome',
                    },
                ],
            },
        ],
    },
];

const RecursiveMenuItem = ({ item, level = 0 }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const paddingMap = {
        0: '',
        1: '!pl-8 !bg-blue-700',
        2: '!pl-10 !bg-blue-800',
        3: '!pl-20 !bg-blue-900',
    };

    const handleToggle = () => {
        if (hasChildren) setOpen((prev) => !prev);
    };

    const { checked, hovered } = useSidebar();

    return (
        <>
            <ListItem
                onClick={hasChildren ? handleToggle : undefined}
                component={!hasChildren && item.path ? Link : 'div'}
                to={!hasChildren && item.path ? item.path : undefined}
                className={`${paddingMap[level]} !cursor-pointer ${checked || hovered ? "" : "h-[48px] !p-[10px]"} ${checked || hovered || level === 0 ? "" : "!hidden"}`}
            >
                {item.icon && (
                    <ListItemIcon className={`${checked || hovered ? "!min-w-[30px]" : "!min-w-full justify-center"}`}>
                        <i className={`${item.icon} text-white`} />
                    </ListItemIcon>
                )}
                {checked || hovered ? <ListItemText primary={<span className="truncate w-full block">{item.title}</span>} /> : ""}
                {hasChildren && (
                    (checked || hovered) ? (
                        open ? (
                            <i className="far fa-chevron-down ml-2 text-xs" />
                        ) : (
                            <i className="far fa-chevron-right ml-2 text-xs" />
                        )
                    ) : null
                )}
            </ListItem>
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child, index) => (
                            <RecursiveMenuItem key={index} item={child} level={level + 1} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

const Sidebar = () => {
    const { checked, setChecked, hovered, setHovered } = useSidebar();

    return (
        <div>
            {(checked || hovered) && (
                <span
                    className="fixed top-0 left-0 w-full h-full bg-blue-50 opacity-50 z-[1011] block md:hidden"
                    onClick={() => setChecked(false)}
                ></span>
            )}

            <Drawer
                variant="permanent"
                PaperProps={{
                    sx: {
                        height: 'calc(100% - 66px)',
                    },
                    className: `!bg-blue-600 !text-white !top-[66px] !transition-all !duration-300 !ease-in-out ${checked || hovered ? "max-w-[240px] min-w-[240px] left-0" : "!left-[-245px] md:!left-0 max-w-[240px] min-w-[240px] md:max-w-[78px] md:min-w-[78px] md:!block"
                        }`
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div>
                    <List className='!p-0'>
                        {menuItems.map((item, index) => (
                            <RecursiveMenuItem key={index} item={item} />
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default Sidebar;