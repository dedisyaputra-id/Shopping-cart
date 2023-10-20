import responsError from "../error/responseError.js";
import prismaDb from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json({
      errors: "unauthorized",
    });
  }

  const user = await prismaDb.user.findFirst({
    where: {
      token: token,
    },
    select: {
      token: true,
    },
  });

  if (!user) {
    res.status(401).json({
      errors: "unauthorized",
    });
  }

  req.user = user;
  next();
};
