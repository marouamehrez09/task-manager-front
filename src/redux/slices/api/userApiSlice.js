import { apiSlice } from "../apiSlice";
const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),

    getTeamList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-team`,
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),

    userAction: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),

    getNotifications: builder.query({
      query: (data) => ({
        url: `${USER_URL}/notifications`,
        method: "GET",

        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),

    markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
  }),
});
export const {
  useUpdateUserMutation,
  useGetTeamListQuery,
  useDeleteUserMutation,
  useUserActionMutation,
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
  useChangePasswordMutation,
} = userApiSlice;
