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

const login = async (req, res, next) => {
  try {
    const login = await authService.login(req.body);
    res.status(200).json({
      data: login,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
