import { CONTACTS_DATA } from "@/modules/history/data/contact";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const contactVariants = {
  hidden: {
    opacity: 0,
    x: -15,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 20,
      mass: 0.6,
    },
  },
  exit: {
    opacity: 0,
    x: 15,
    scale: 0.96,
    transition: {
      duration: 0.18,
      ease: "easeInOut" as const,
    },
  },
};

const avatarVariants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.12,
    rotate: 3,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 12,
    },
  },
  tap: {
    scale: 0.92,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 15,
    },
  },
};

const nameVariants = {
  rest: {
    x: 0,
    opacity: 0.9,
  },
  hover: {
    x: 2,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export function ContactsLists() {
  // Memoize the data to prevent unnecessary re-renders
  const memoizedContacts = useMemo(() => CONTACTS_DATA, []);

  return (
    <div className="m-5 mt-0">
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
        Contacts
      </motion.h3>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {memoizedContacts.map((contact) => (
            <motion.div
              key={contact.id}
              className="flex cursor-pointer items-center gap-3"
              variants={contactVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              layout
            >
              {/* Animated Avatar */}
              <motion.div
                className="relative"
                variants={avatarVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="text-xs">
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Animated Name */}
              <motion.h1
                className="truncate text-sm font-light"
                variants={nameVariants}
                initial="rest"
                whileHover="hover"
              >
                {contact.name}
              </motion.h1>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
