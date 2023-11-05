import cartService from "../service/cart-service.js";

const get = async (req, res, next) => {
  try {
    const cart = await cartService.get();
    res.status(200).json({
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await cartService.destroy(req.params);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  destroy,
};
