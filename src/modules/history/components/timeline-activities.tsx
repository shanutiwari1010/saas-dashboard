import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ACTIVITY_DATA } from "@/modules/history/data/activity";
import { formatTimeAgo } from "@/modules/history/utils/date";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

// Performance-optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const avatarVariants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
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
    x: 4,
    opacity: 0.9,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export function TimelineActivities() {
  // Memoize the data to prevent unnecessary re-renders
  const memoizedActivities = useMemo(() => ACTIVITY_DATA, []);

  return (
    <div className="flex h-full flex-col">
      {/* Activities Section */}
      <div className="m-5">
        <motion.h3
          className="heading mb-2 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring" as const,
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
        >
          Activities
        </motion.h3>

        <div className="relative">
          {/* Timeline Items Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {memoizedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="relative flex items-start gap-3"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  whileHover="hover"
                  layout
                >
                  {index < memoizedActivities.length - 1 && (
                    <motion.div
                      className="bg-muted absolute top-7 left-3 z-0 h-6 w-0.5"
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 100,
                        damping: 20,
                        delay: 0.3 + index * 0.1,
                      }}
                    />
                  )}

                  <motion.div
                    variants={avatarVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative z-30 flex-shrink-0"
                  >
                    <Avatar className="h-6 w-6 cursor-pointer">
                      <AvatarImage src={activity.image} />
                    </Avatar>
                  </motion.div>

                  {/* Content with micro-animations */}
                  <motion.div
                    className="flex min-w-0 flex-1 flex-col"
                    variants={contentVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <motion.p
                      className="truncate text-sm font-light"
                      initial={{ opacity: 0.9 }}
                      whileHover={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                    >
                      {activity.title}
                    </motion.p>
                    <motion.span
                      className="text-muted-foreground text-xs"
                      initial={{ opacity: 0.7 }}
                      whileHover={{
                        opacity: 0.9,
                        transition: { duration: 0.15 },
                      }}
                    >
                      {formatTimeAgo(activity.timestamp)}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
