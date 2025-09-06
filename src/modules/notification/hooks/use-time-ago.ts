import { useCallback } from "react";

const TIME_UNITS = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "week", seconds: 604800 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
] as const;

export const useTimeAgo = () => {
  const calculateTimeAgo = useCallback((date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0) return "just now";
    if (diffInSeconds < 60) return "just now";

    for (const unit of TIME_UNITS) {
      const count = Math.floor(diffInSeconds / unit.seconds);
      if (count >= 1) {
        const plural = count === 1 ? unit.label : `${unit.label}s`;

        if (count === 1 && unit.label === "day") return "yesterday";
        if (count === 1 && unit.label === "hour") return "1 hour ago";
        if (count === 1 && unit.label === "minute") return "1 minute ago";

        if (count < 24 && unit.label === "hour") return `${count} hours ago`;
        if (count < 7 && unit.label === "day") return `${count} days ago`;
        if (count < 4 && unit.label === "week") return `${count} weeks ago`;
        if (count < 12 && unit.label === "month") return `${count} months ago`;

        return `${count} ${plural} ago`;
      }
    }

    return "just now";
  }, []);

  const getRelativeTime = useCallback((date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return "less than an hour ago";
    if (diffInSeconds < 86400) return "today";
    if (diffInSeconds < 172800) return "yesterday";
    if (diffInSeconds < 604800) return "this week";
    if (diffInSeconds < 2592000) return "this month";
    if (diffInSeconds < 31536000) return "this year";

    return "older";
  }, []);

  const formatExactTime = useCallback((date: Date): string => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday =
      new Date(now.getTime() - 86400000).toDateString() === date.toDateString();

    if (isToday) {
      return `Today, ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`;
    }

    if (isYesterday) {
      return `Yesterday, ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  return {
    calculateTimeAgo,
    getRelativeTime,
    formatExactTime,
  };
};
