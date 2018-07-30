export default (internet: any) => async () => {
  try {
    const res = await internet({ url: "/example" });

    return {
      data: res,
      ok: true
    };
  } catch (error) {
    return { message: error.message, ok: false };
  }
};
