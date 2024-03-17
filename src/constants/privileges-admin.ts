export const ADMIN_ACCESS_LEVELS = {
  id: 2,
  type: "admin",
  name: "ADMIN",
  action: true,
  permissions: {
    listingAccessGrid: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    reviewAccessGrid: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
};
