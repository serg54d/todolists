import axios from "axios"

import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/components/instance/instance"
import { Inputs } from "../ui/login/Login"

export const authApi = {
    login: (payload: Inputs) => {
        return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
    },
    logout: () => {
        return instance.delete<BaseResponse>("auth/login")
    },
    me: () => {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
    },
}
