import { useQuery } from "@tanstack/react-query";
import { getNotifications, type Notification } from "@/lib/tmdb";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationsMenu = () => {
  const navigate = useNavigate();
  const [readSet, setReadSet] = useState<Set<string>>(() =>
    new Set(JSON.parse(localStorage.getItem("readNotifications") || "[]"))
  );

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 mins
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("readNotifications") || "[]");
    setReadSet(new Set(stored));
  }, [notifications]);

  const unreadCount = useMemo(
    () => notifications.filter(n => !readSet.has(n.id)).length,
    [notifications, readSet]
  );

  const handleNotificationClick = (notification: Notification) => {
    const updatedSet = new Set(readSet);
    updatedSet.add(notification.id);
    localStorage.setItem("readNotifications", JSON.stringify(Array.from(updatedSet)));
    setReadSet(updatedSet);

    const { movieId, mediaType } = notification.data || {};
    if (movieId) {
      navigate(`/${mediaType}/${movieId}/watch`);
    }
  };

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    localStorage.setItem("readNotifications", JSON.stringify(allIds));
    setReadSet(new Set(allIds));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_content":
        return "🎬";
      case "watch_progress":
        return "▶️";
      case "system":
        return "🔔";
      default:
        return "📌";
    }
  };

  // Sort so newest notifications appear first
  const sortedNotifications = [...notifications].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative" aria-label="Notifications">
          <Bell className="w-6 h-6 text-white hover:text-gray-300 transition-all duration-200" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-black/95 text-white border border-gray-800 p-2 rounded-lg shadow-xl"
      >
        <div className="flex items-center justify-between mb-2 px-2">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-gray-400 hover:text-white transition-all duration-200"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div
          className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
          aria-live="polite"
        >
          {sortedNotifications.length === 0 ? (
            <div className="text-center text-gray-400 py-4">No notifications</div>
          ) : (
            sortedNotifications.map(notification => {
              const isRead = readSet.has(notification.id);
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex items-start gap-3 p-3 cursor-pointer rounded-lg mb-1 transition-all duration-200 ${
                    isRead
                      ? "opacity-60 hover:bg-gray-800/30 border-l-4 border-gray-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  {!isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
