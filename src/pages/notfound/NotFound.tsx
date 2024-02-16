import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function NotFound() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate('/login');
    //     })
    // }, [])

    return <>Trang web này không tồn tại hoặc bạn không có quyền truy cập</>
};
