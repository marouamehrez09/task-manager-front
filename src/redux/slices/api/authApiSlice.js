import { apiSlice } from "../apiSlice";
const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        //credentials:"include",   // contient cookies
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        //credentials:"include",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        //credentials:"include",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
