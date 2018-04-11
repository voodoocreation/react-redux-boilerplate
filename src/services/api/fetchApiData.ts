export default (internet: any) => {
  return async () => {
    try {
      const res = await internet({ url: `/example` });

      return {
        data: res,
        ok: true
      };
    } catch (err) {
      return { ok: false, message: err.toString() };
    }
  };
};
