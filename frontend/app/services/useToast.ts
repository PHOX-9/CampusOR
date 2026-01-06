"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export type QueueStatus = "waiting" | "near" | "served" | "cancelled" | "no-queue";

export const useQueueToasts = (status: QueueStatus) => {
  useEffect(() => {
    switch (status) {
      case "waiting":
        toast(`You’re in the queue. Sit back and relax.`, {
          icon: "⏳",
          duration: 3000,
        });
        break;

      case "near":
        toast.warning(`You’re next! Please stay nearby.`, {
          icon: "⚠️",
          duration: 4000,
        });
        break;

      case "served":
        toast.success(`You’ve been served! 🎉`, {
          icon: "✅",
          duration: 4000,
        });
        break;

      case "cancelled":
        toast.error(`You left the queue ❌`, {
          icon: "❌",
          duration: 4000,
        });
        break;

      case "no-queue":
        // no toast needed
        break;
    }
  }, [status]);
};
