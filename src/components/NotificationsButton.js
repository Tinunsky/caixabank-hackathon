import React, { useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { IconButton, Badge } from "@mui/material";
import NotificationPopup from "./NotificationPopup";
import { budgetAlertStore } from "../stores/budgetAlertStore";
import { useStore } from "@nanostores/react";

const NotificationsButton = () => {
  const [notificationVisible, setNotificationVisible] = React.useState(false);
  const [notificationBadge, setNotificationBadge] = React.useState(false);
  const budgetAlert = useStore(budgetAlertStore);

  const onClose = () => {
    setNotificationVisible(false);
  };
  const onClick = () => {
    setNotificationVisible(true);
    setNotificationBadge(false);
  };
  useEffect(() => {
    budgetAlert.message !== "" && setNotificationBadge(true);
  }, [budgetAlert]);

  return (
    <>
      <IconButton color="inherit" onClick={onClick}>
        <Badge
          color={notificationBadge ? "error" : "transparent"}
          variant="dot"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {budgetAlert.message !== "" && (
        <NotificationPopup
          open={notificationVisible}
          message={budgetAlert.message}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default NotificationsButton;
