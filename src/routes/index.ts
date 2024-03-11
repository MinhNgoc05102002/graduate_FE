import AuthLayout from "~/layouts/Auth/AuthLayout"
import { DefaultLayout } from "~/layouts/Index"
import { HomePage, LoginPage } from "~/pages"
import Account from "~/pages/account"
import Credit from "~/pages/credit/Credit"
import Dashboard from "~/pages/dashboard"
import Folder from "~/pages/folder/Folder"
import Class from "~/pages/class/Class"
import Register from "~/pages/register/index"
import CreateCredit from "~/pages/create-credit/CreateCredit"

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
    {
        path:"/credit/:id",
        page: Credit,
        layout: DefaultLayout
    },
    {
        path:"/folder/:id",
        page: Folder,
        layout: DefaultLayout
    },
    {
        path:"/class/:id",
        page: Class,
        layout: DefaultLayout
    },
    {
        path:"/create-credit",
        page: CreateCredit,
        layout: DefaultLayout
    },
    // {
    //     path:"/account/:username/:list",
    //     page: Account,
    //     layout: DefaultLayout
    // }
]