import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const auth = async () => {
    const { data } = await api.get("/auth/me");
    return data.user.username;
};

export const useUser = () => {
    const query = useQuery({
        queryKey: ["user"],
        queryFn: auth,
    });

    return {
        user: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
};
