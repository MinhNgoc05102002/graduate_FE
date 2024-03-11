import PerfectScrollbar from "perfect-scrollbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { inforUser, logout } from "~/redux/slices/authSlice";
import { Post } from "~/services/axios";
import { CheckResponseSuccess, findNotifDate } from "~/utils/common";

type noti = {
    LINK: string,
    ICON: string
}

// const NOTI_TYPE = {
//     REPEAT_LEARN: {
//         LINK: '/credit/',
//         ICON: '/src/assets/img/icons/noti_icon_remind.png'
//     },
//     ADMIN_WARN: {
//         LINK: "",
//         ICON: '/src/assets/img/icons/noti_icon_warning.png'
//     },
//     CLASS_INFO: {
//         LINK: '/class/',
//         ICON: '/src/assets/img/icons/noti_icon_user.png'
//     },
//     CLASS_UPDATE: {
//         LINK: '/class/',
//         ICON: '/src/assets/img/icons/noti_icon_update.png'
//     },
// }

// let x:"REPEAT_LEARN" | "ADMIN_WARN" | "CLASS_INFO" | "CLASS_UPDATE" = 'CLASS_UPDATE';

// console.log(NOTI_TYPE[x]);

const NOTI_TYPE = [
    {
        id: 'REPEAT_LEARN',
        link: '/credit/',
        icon: '/src/assets/img/icons/noti_icon_remind.png'
    },
    {
        id: 'ADMIN_WARN',
        link: null,
        icon: '/src/assets/img/icons/noti_icon_warning.png'
    },
    {
        id: 'CLASS_INFO',
        link: '/class/',
        icon: '/src/assets/img/icons/noti_icon_user.png'
    },
    {   id: 'CLASS_UPDATE',
        link: '/class/',
        icon: '/src/assets/img/icons/noti_icon_update.png'
    }
]

function NotiItem(props: any) {
    // console.log(findNotifDate('2024-02-15T01:26:27.69'))
    const navigate = useNavigate();
    const {noti} = props;

    const handleNavigate = () => {
        let link = NOTI_TYPE.find(item => item.id === noti.notiType)?.link;
        if (link) {
            navigate(link + noti.link);
        }
    }

    const icon = NOTI_TYPE.find(item => item.id === noti.notiType)?.icon

    return (
        <li>
            <a onClick={() =>  handleNavigate()} className="dropdown-item" href="#" style={{textWrap: 'wrap'}}>
                <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                            <img src={icon} className="w-px-40 h-auto rounded-circle" />
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <span className="fw-semibold d-block">
                            {noti.content}
                            <small className="text-muted"> {findNotifDate(noti.createdAt)}</small>
                        </span>
                        
                    </div>
                </div>
            </a>
        </li>
    )
}

export default function Header() {
    const userData = useAppSelector(inforUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [listNoti, setListNoti] = useState([]);

    useEffect(() => {
        const ps = new PerfectScrollbar('#scroll_noti', {
            wheelPropagation: false,
        });

        getNotification();
    }, [])

    const handleLogout = () => {
        dispatch(logout())
    }

    const getNotification = async () => {
        // setIsLoading(true);
        await Post(
            "/api/Account/get-noti", 
            {
                pageSize: 3,
                pageIndex: 0
            }, 
            // userData?.token ?? ""
        ).then((res) => {
            if(CheckResponseSuccess(res)) {
                let listNoti = res?.returnObj?.listResult;
                setListNoti(listNoti);
            }
            else {
                toast.error("Đã có lỗi xảy ra.");
            }
        })
        .catch((err) => {
            toast.error("Đã có lỗi xảy ra.");
            console.log(err);
        })
        // setIsLoading(false);
    };

    return (
        <>
            {/* <!-- Navbar --> */}
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
            >
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    {/* <!-- Search --> */}
                    <div className="navbar-nav align-items-center w-100">
                        <div className="nav-item d-flex align-items-center w-100">
                            <i className="bx bx-search fs-4 lh-0"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Tìm kiếm..."
                                aria-label="Tìm kiếm..."
                            />
                        </div>
                    </div>
                    {/* <!-- /Search --> */}

                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* <!-- Noti --> */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                                {/* <div className="avatar">
                                    <button type="button" className="btn rounded-pill btn-icon btn-outline-primary">
                                        <span className="tf-icons bx bx-bell"></span>
                                    </button>
                                </div> */}
                                <div className="avatar">
                                    <button type="button" className="btn rounded-pill btn-icon btn-outline-secondary">
                                        <span className="tf-icons bx bx-bell"></span>
                                    </button>
                                </div>
                            </a>
                            <ul id="scroll_noti" className="dropdown-menu dropdown-menu-end w-px-500 h-px-350" style={{maxHeight: '350px', overflow: 'hidden'}}>
                                {listNoti.map((noti:any) => (
                                    <NotiItem key={noti.notiId} noti = {noti}/>
                                ))}
                                
                                
                                
                                
                                {/* <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a onClick={handleLogout} className="dropdown-item" href="#">
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Đăng xuất</span>
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                        {/* <!--/ Noti --> */}

                        {/* <!-- User --> */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img src={userData?.avatar} className="w-px-40 h-auto rounded-circle" />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a onClick={() => navigate(`/account/${userData?.username}`)} className="dropdown-item" href="#">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img src={userData?.avatar} className="w-px-40 h-auto rounded-circle" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="fw-semibold d-block">{userData?.username}</span>
                                                <small className="text-muted">{userData?.email}</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a onClick={() => navigate(`/account/${userData?.username}`)} className="dropdown-item" href="#">
                                        <i className="bx bx-user me-2"></i>
                                        <span className="align-middle">Trang cá nhân</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">Cài đặt</span>
                                    </a>
                                </li>
                                {/* <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="d-flex align-items-center align-middle">
                                            <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                            <span className="flex-grow-1 align-middle">Billing</span>
                                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                        </span>
                                    </a>
                                </li> */}
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <Link to="/login" onClick={handleLogout} className="dropdown-item" >
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Đăng xuất</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <!--/ User --> */}
                    </ul>
                </div>
            </nav>

            {/* <!-- / Navbar --> */}
        </>
    )

};
