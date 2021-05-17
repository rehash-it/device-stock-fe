import http from "../http-common";

const Auth = (data) => {
  return http.post("/auth",data);
};

export default {
    Auth
};
