import $http from "./xhr";

export const userGetAll = async () => await $http.get("/users");
export const userGetMe = async () => await $http.get(`/users/me`);
export const userGetOne = async (id: string) => await $http.get(`/users/${id}`);
export const userGetAdminStats = async () => await $http.get(`/users/admin-stats`);
export const userLogin = async (data: any) => await $http.post("/users/login", data);

export const questionGetAll = async () => await $http.get("/questions");
export const questionCreate = async (data: any) => await $http.post("/questions", data);
export const questionDelete = async (id: string) => await $http.delete(`/questions/${id}`);
export const questionUpdate = async ({ id, data }: any) => await $http.patch(`/questions/${id}`, data);

export const answerCreate = async (data: any) => await $http.post("/answers", data);
export const answerDelete = async (id: string) => await $http.delete(`/answers/${id}`);
export const answerGetAllByUser = async (id: string) => await $http.get(`/answers/user/${id}`);