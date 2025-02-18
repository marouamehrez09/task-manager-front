import { apiSlice } from "../apiSlice";

const TASK_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASK_URL}/dashboard`,
        method: "GET",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    getAllTask: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    trashTask: builder.mutation({
      query: ({ id }) => ({
        url: `${TASK_URL}/${id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    createSubTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TASK_URL}/create-subtask/${id}`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),

    getSingleTask: builder.query({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "GET",

        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
    postTaskActivity: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TASK_URL}/activity/${id}`,
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
    deleteRestoreTask: builder.mutation({
      query: ({ id, actionType }) => ({
        url: `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useTrashTaskMutation,
  useCreateSubTaskMutation,
  useGetSingleTaskQuery,
  usePostTaskActivityMutation,
  useDeleteRestoreTaskMutation,
} = taskApiSlice;
