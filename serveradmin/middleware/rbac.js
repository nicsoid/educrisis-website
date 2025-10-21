const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasRole = roles.some((role) => req.user.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};

const permissions = {
  admin: ["all"],
  editor: [
    "content:read",
    "content:write",
    "newsletter:read",
    "newsletter:write",
  ],
  viewer: ["content:read", "donations:read", "newsletter:read"],
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userPermissions = req.user.roles.reduce((acc, role) => {
      return [...acc, ...(permissions[role] || [])];
    }, []);

    if (
      !userPermissions.includes("all") &&
      !userPermissions.includes(permission)
    ) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};

module.exports = { checkRole, checkPermission };
