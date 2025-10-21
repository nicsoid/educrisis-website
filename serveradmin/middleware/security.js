const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});

// Auth rate limiting (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 login attempts per 15 minutes
  skipSuccessfulRequests: true,
});

// Apply security headers
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});

// Input validation
const validateInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
};

// Audit logging
const auditLog = (action) => {
  return async (req, res, next) => {
    const log = {
      userId: req.user?._id,
      action,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      timestamp: new Date(),
      data: req.body,
    };

    // Save to audit log collection
    await AuditLog.create(log);
    next();
  };
};

module.exports = {
  limiter,
  authLimiter,
  securityHeaders,
  mongoSanitize,
  xss,
  validateInput,
  auditLog,
};
