async function quickFetch(endpoint) {
  const token = localStorage.getItem("token");
  let setHeader;
  if (token) {
    setHeader = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
  }

  const URL = "http://178.170.206.10:999/core/api";
  const response = await fetch(`${URL}${endpoint}`, token && setHeader);
  const json = await response.json();
  const result = json.results ? json.results : json;
  return result;
}

export default function makeService(endpoint) {
  return {
    async find(id) {
      return quickFetch(`${endpoint}/${id}`);
    },
    async list() {
      return quickFetch(endpoint);
    }
  };
}
