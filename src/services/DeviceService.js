import http from "../http-common";

const getAll = () => {
    return http.get("/device");
};

const create = (data) => {
    return  http.post("/device", data);
};

const update = (id,data) => {
    return http.put(`/device/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/device/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove,
};