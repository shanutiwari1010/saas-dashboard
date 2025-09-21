import { BugBeetle, Broadcast, Bell, UserPlus } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeAgo } from "@/modules/notification/utils/format";
import { NOTIFICATIONS_DATA } from "@/modules/notification/data/notifications";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "bug_urgent":
    case "bug_reported":
    case "bug_fixed":
      return <BugBeetle className="h-4 w-4" />;
    case "user_registered":
    case "user_subscribed":
    case "user_followed":
      return <UserPlus className="h-4 w-4" />;
    case "system_maintenance":
    case "system_update":
    case "feature_release":
      return <Broadcast className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getIconBackgroundClass = (type: string) => {
  switch (type) {
    case "bug_urgent":
    case "bug_reported":
    case "bug_fixed":
    case "system_maintenance":
    case "system_update":
    case "feature_release":
      return "bg-dashboard-blue-light";
    case "user_registered":
    case "user_subscribed":
    case "user_followed":
    default:
      return "bg-dashboard-purple-light";
  }
};

// Performance-optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const notificationVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
      mass: 0.7,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const,
    },
  },
};

const iconVariants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.15,
    rotate: 8,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 12,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 15,
    },
  },
};

const contentVariants = {
  rest: {
    x: 0,
    opacity: 1,
  },
  hover: {
    x: 3,
    opacity: 0.95,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const textVariants = {
  rest: {
    opacity: 0.9,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

export function Notifications() {
  // Memoize the data to prevent unnecessary re-renders
  const memoizedNotifications = useMemo(() => NOTIFICATIONS_DATA, []);

  return (
    <div className="flex h-full flex-col">
      <div>
        <motion.h3
          className="heading m-5 mb-2 px-1 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring" as const,
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
        >
          Notifications
        </motion.h3>

        <motion.div
          className="mx-5 "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {memoizedNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                layout
              >
                <Card
                  className={cn(
                    "cursor-pointer rounded-none border-none bg-transparent shadow-none transition-all duration-200"
                  )}
                >
                  <CardContent className="p-0 py-2 ">
                    <motion.div
                      className="flex items-start   gap-3"
                      variants={contentVariants}
                      initial="rest"
                      whileHover="hover"
                    >
                      {/* Animated Icon Container */}
                      <motion.div
                        className={cn(
                          "flex flex-shrink-0 cursor-pointer items-center justify-center rounded-md p-1 text-black",
                          getIconBackgroundClass(notification.type)
                        )}
                        variants={iconVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {getTypeIcon(notification.type)}
                      </motion.div>

                      {/* Animated Content */}
                      <motion.div
                        className="max-w-48 min-w-0 flex-1 text-lg "
                        variants={textVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        <motion.p
                          className="truncate overflow-hidden text-sm font-light text-ellipsis whitespace-nowrap"
                          initial={{ opacity: 0.9 }}
                          whileHover={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                          }}
                        >
                          {notification.title}
                        </motion.p>

                        <motion.div
                          className="flex items-center  gap-2"
                          initial={{ opacity: 0.8 }}
                          whileHover={{
                            opacity: 0.95,
                            transition: { duration: 0.15 },
                          }}
                        >
                          <motion.span
                            className="text-muted-foreground text-xs font-light"
                            initial={{ opacity: 0.7 }}
                            whileHover={{
                              opacity: 0.9,
                              transition: { duration: 0.15 },
                            }}
                          >
                            {formatTimeAgo(notification.timestamp)}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
