import React, { useEffect } from "react";
import { Box, Button, ClickAwayListener, Paper, Popper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotificationList = ({ notifications, setNotifications, unreadCount, setUnreadCount, anchorEl, setAnchorEl }) => {
    useEffect(() => {
        setUnreadCount(notifications.filter((n) => !n.isRead).length);
    }, [notifications, setUnreadCount]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const markAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((n) => ({ ...n, isRead: true }))
        );
        setUnreadCount(0);
    };

    return (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end" className="z-[9999]">
            <ClickAwayListener onClickAway={handleClose}>
                <Paper sx={{ minWidth: 300, borderRadius: 2, boxShadow: 3 }} className="bg-white p-2">
                    <div className="flex justify-between border-b pb-2 mb-2">
                        <Typography variant="h6">Notifications</Typography>
                        <Button onClick={markAllAsRead} variant="outlined" size="small">
                            Mark All Read
                        </Button>
                    </div>

                    <div className="max-h-72 overflow-auto">
                        {notifications.map((notification) => (
                            <Box key={notification.id} className={`notification__item mb-2 p-2 ${notification.isRead ? "bg-gray-100" : "bg-blue-100"}`} sx={{ borderRadius: 1 }}>
                                <Link to={`/Notification/${notification.id}`} className="notification__link">
                                    <div className="flex items-start space-x-2">
                                        <div className="text-green-500">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <div className="flex-1">
                                            <Typography variant="body2" className="font-semibold">{notification.title}</Typography>
                                            <Typography variant="body2" className="text-sm text-gray-600">{notification.message}</Typography>
                                            <Typography variant="caption" className="text-gray-500 text-right">{notification.time}</Typography>
                                        </div>
                                        <Button className="remove-notification text-red-500" size="small">
                                            <i className="far fa-times"></i>
                                        </Button>
                                    </div>
                                </Link>
                            </Box>
                        ))}
                    </div>

                    <div className="border-t pt-2">
                        <Link to="/Notification/Index" className="w-full text-center block text-blue-600">View All</Link>
                    </div>
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
};

export default NotificationList;
