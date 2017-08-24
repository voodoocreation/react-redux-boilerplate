export const fetchApiData = client => (body, opts) => client.get('/example', opts);

export default {
  fetchApiData,
};
