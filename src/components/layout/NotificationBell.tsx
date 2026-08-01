"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { io, type Socket } from "socket.io-client";

interface NotificationItem {
  _id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

const typeIcons: Record<string, string> = {
  order_placed: "🛒",
  order_confirmed: "✅",
  order_shipped: "📦",
  order_delivered: "🏠",
  payment_success: "💳",
  payment_failed: "⚠️",
  bill_ready: "🧾",
  custom_request_received: "🎨",
  custom_request_replied: "💬",
  custom_request_quoted: "💰",
  custom_request_status_update: "📋",
  new_artwork: "🖼️",
  admin_message: "📢",
  system: "🔔",
};

export default function NotificationBell() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    if (!session?.user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notifications?limit=10", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications ?? data.items ?? []);
        setUnread(data.unreadCount ?? 0);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    if (!session?.user) return;
    fetchNotifications();
  }, [session?.user, fetchNotifications]);

  useEffect(() => {
    if (!session?.user) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin, {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;
    socket.on("connect", () => {
      socket.emit("join", { userId: session.user?.id });
    });
    socket.on("notification", (notif: NotificationItem) => {
      setNotifications((prev) => [notif, ...prev].slice(0, 10));
      setUnread((prev) => prev + 1);
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [session?.user]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        credentials: "include",
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
    } catch {
      // silent
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) fetchNotifications();
        }}
        className="relative w-10 h-10 flex items-center justify-center rounded-full text-muted hover:text-accent hover:bg-section transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-danger text-white text-[10px] font-semibold">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h4 className="font-serif text-sm font-semibold text-heading">Notifications</h4>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  <CheckCheck size={14} /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {loading && notifications.length === 0 ? (
                <p className="p-4 text-sm text-muted text-center">Loading...</p>
              ) : notifications.length === 0 ? (
                <p className="p-6 text-sm text-muted text-center">No notifications yet</p>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n._id}
                    onClick={() => {
                      if (n.link) window.location.href = n.link;
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-section transition-colors border-b border-border/50 last:border-b-0 ${
                      !n.read ? "bg-accent/[0.03]" : ""
                    }`}
                  >
                    <span className="text-lg shrink-0 mt-0.5">
                      {typeIcons[n.type] ?? typeIcons.system}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-heading truncate">{n.title}</span>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                      </span>
                      <span className="text-xs text-muted line-clamp-2 block mt-0.5">
                        {n.message}
                      </span>
                      <span className="text-[11px] text-muted/70 mt-1 block">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </span>
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
