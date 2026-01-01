
export const userDashboardMock = {
  user: {
    userId: "u_123",
    name: "Student User",
  },

  queue: {
    queueId: "q_admin_docs",
    name: "Admin Office – Document Verification",
    location: "Ground Floor, Block A",
    status: "active", // active | paused | closed
  },

  token: {
    tokenNumber: "T-042",
    seq: 42,
    status: "waiting", // waiting | near | served | cancelled
  },

  liveContext: {
    nowServing: "T-039",
    countersActive: 2,
  },

  estimate: {
    estimatedWaitMinutes: 12,
    usersAhead: 3,
  },

  reassurance: {
    message: "You’ll be notified when your turn is near. You can safely wait.",
  },

  lastUpdated: "10:28 AM",
};


export const userNearTurnMock = {
  ...userDashboardMock,
  token: {
    tokenNumber: "T-042",
    seq: 42,
    status: "near",
  },
  liveContext: {
    nowServing: "T-041",
    countersActive: 2,
  },
  estimate: {
    estimatedWaitMinutes: 3,
    usersAhead: 1,
  },
  reassurance: {
    message: "Get ready! Your turn is coming up shortly.",
  },
};


export const userServedMock = {
  ...userDashboardMock,
  token: {
    tokenNumber: "T-042",
    seq: 42,
    status: "served",
  },
  estimate: null,
  reassurance: {
    message: "You have been served. Thank you!",
  },
};


export const userCancelledMock = {
  ...userDashboardMock,
  token: {
    tokenNumber: "T-042",
    seq: 42,
    status: "cancelled",
  },
  estimate: null,
  reassurance: {
    message: "You’ve left the queue. You can join again anytime.",
  },
};


export const userNoActiveQueueMock = {  
  user: {
    userId: "u_123",
    name: "Student User",
  },
  activeQueue: null,
  message: "You’re not in any queue right now.",
  actionHint: "Browse available queues to get started.",
};
