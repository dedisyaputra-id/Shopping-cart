import authService from "../service/auth-service.js";

const register = async (req, res, next) => {
  try {
    const register = await authService.register(req.body);
    res.status(201).json({
      data: register,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
