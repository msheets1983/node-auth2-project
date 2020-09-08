const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: "You Shall Not Pass!",
    };

    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          return res.status(401).json(authError);
        }

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
