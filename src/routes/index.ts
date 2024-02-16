import AuthLayout from "~/layouts/Auth/AuthLayout"
import { DefaultLayout } from "~/layouts/Index"
import { HomePage, LoginPage } from "~/pages"
import Account from "~/pages/account"
import Dashboard from "~/pages/dashboard"
import Register from "~/pages/register/index"

export const PUBLIC_ROUTER = [
    {
        path:"/login",
        page: LoginPage,
        layout: null
    },
    {
        path:"/register",
        page: Register,
        layout: AuthLayout
    },
]

export const PRIVATE_ROUTER = [
    // {
    //     path:"/",
    //     page: HomePage,
    //     layout: null
    // }, 
    {
        // path:"/dashboard",
        path:"/",
        page: Dashboard,
        layout: DefaultLayout
    },
    {
        path:"/account/:username",
        page: Account,
        layout: DefaultLayout
    },
    // {
    //     path:"/account/:username/:list",
    //     page: Account,
    //     layout: DefaultLayout
    // }
]