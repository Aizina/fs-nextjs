"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import { usePathname } from "next/navigation";

type NotificationType = "success" | "error";

type Notification = {
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  showNotification: (
    message: string,
    type?: NotificationType
  ) => void;
};

const NotificationContext =
  createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] =
    useState<Notification | null>(null);

  const pathname = usePathname();

  const showNotification = useCallback(
    (
      message: string,
      type: NotificationType = "success"
    ) => {
      setNotification({ message, type });
    },
    []
  );

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((item) =>
        item.startsWith("blog-notification=")
      );

    if (cookie) {
      const value = cookie.slice(
        "blog-notification=".length
      );

      document.cookie =
        "blog-notification=; Max-Age=0; Path=/";

      Promise.resolve().then(() => {
        showNotification(decodeURIComponent(value));
      });
    }
  }, [pathname, showNotification]);

  useEffect(() => {
    if (!notification) return;

    const timer = window.setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{ showNotification }}
    >
      {notification && (
        <div
          data-testid="notification"
          role="status"
          className={`mx-auto mt-4 max-w-4xl rounded-lg
            border p-4 font-medium ${
              notification.type === "success"
                ? "border-green-300 bg-green-100 text-green-800"
                : "border-red-300 bg-red-100 text-red-800"
            }`}
        >
          {notification.message}
        </div>
      )}

      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}