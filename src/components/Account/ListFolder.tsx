import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "~/redux/hook";
import { inforUser } from "~/redux/slices/authSlice";
import { Post } from "~/services/axios";
import { ICredit } from "~/types/ICredit";
import { CheckResponseSuccess } from "~/utils/common";
import Loading from "../Loading/Index";

// truyền username của user đang đăng nhập vào đây
export default function ListFolder(props:any) {
    const {username} = props
    const userData = useAppSelector(inforUser);
    const [listCredit, setListCredit] = useState<ICredit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        if (userData?.token) {
            getRecentCredit();
        }
    }, [userData?.token, username])

    const getRecentCredit = async () => {
        // dispatch(login(formLogin))
        setIsLoading(true);
        await Post(
            "/api/Credit/get-list-credit-by-user", 
            {
                pageSize: 100,
                pageIndex: 0,
                searchText: search,
                username: username
            }, 
            userData?.token ?? ""
        ).then((res) => {
            if(CheckResponseSuccess(res)) {
                let listCredit = res?.returnObj?.listResult;
                setListCredit(listCredit);
            }
            else {
                toast.error("Đã có lỗi xảy ra.");
            }
        })
        .catch((err) => {
            toast.error("Đã có lỗi xảy ra.");
            console.log(err);
        })
        setIsLoading(false);
    };

    return (
        <>
            <Loading isLoading={isLoading}/>
            <ToastContainer />
            List Folder
        </>)
};
