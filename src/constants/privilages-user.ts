export const USER_ACCESS_LEVELS = {
  id: 1,
  type: "user",
  name: "USER",
  action: false,
  permissions: {
    listingAccessGrid: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    reviewAccessGrid: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
};
