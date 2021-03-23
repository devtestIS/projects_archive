import http from '@/store/helpers/http';
const loader = async (ctx, method, params) => {
  try {
    ctx.load = true;
    const response = await http.get(method, {
      params,
    });
    ctx.load = false;
    return response;
  } catch (error) {
    if (error.response) {
      ctx.CHECKOUT_ERROR_STATUS(error.response.status);
    }
    console.error(error);
  }
};

export default loader;
