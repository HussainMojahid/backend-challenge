export const BUSINESS_OWNER_ACCESS_LEVELS = {
  id: 3,
  type: "business_owner",
  name: "BUSINESS OWNER",
  action: true,
  permissions: {
    listingAccessGrid: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    reviewAccessGrid: {
      create: false,
      read: true,
      update: true,
      delete: false,
    },
  },
};
