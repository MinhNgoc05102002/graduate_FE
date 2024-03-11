import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BoxCreditAccount from "~/components/Account/Box/BoxCreditAccount";
import Loading from "~/components/Loading/Index";
import { useAppSelector } from "~/redux/hook";
import { inforUser } from "~/redux/slices/authSlice";
import { Post } from "~/services/axios";
import { ICredit } from "~/types/ICredit";
import { CheckResponseSuccess, GetIdFromCurrentPage } from "~/utils/common";
import styles from "./Folder.module.scss";
import { IFolder } from "~/types/IFolder";
import NotFound from "../notfound/NotFound";
import BoxCredit from "~/components/BoxCredit/Index";

export default function Folder() {
    const [isLoading, setIsLoading] = useState(false);
    const [folder, setFolder] = useState<IFolder|null>(null);
    const userData = useAppSelector(inforUser);
    const folderId = GetIdFromCurrentPage();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setToTalPage] = useState(1);
    const [listCredit, setListCredit] = useState<ICredit[]>([]);

    useEffect(() => {
        getInfoFolder();
    }, [folderId]);


    const getInfoFolder = async () => {
        setIsLoading(true);
        await Post(
            "/api/Folder/get-folder-by-id", 
            {
                pageSize: 5,
                pageIndex: pageIndex,
                searchText: search,
                containerId: folderId
            }, 
        ).then((res) => {
            if(CheckResponseSuccess(res)) {
                let folder = res?.returnObj;
                if (folder) {
                    setFolder(folder);
                    setListCredit(folder.credits);
                }
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

    const handleSearch = (e:any = null) => {
        setPageIndex(1)
        e?.preventDefault();
        getInfoFolder()
    }

    if (!folder) {
        return (
            <>
                {isLoading ? null : <NotFound />}
                <Loading isLoading={isLoading}/>
                <ToastContainer />
            </>
        )
    }

    return (
        <>
            <Loading isLoading={isLoading}/>
            <ToastContainer />

            <div className={`container-xxl flex-grow-1 container-p-y ${styles.container}`}>

                <div className={styles.header_author}>
                    <div className="d-flex align-items-center">
                        <div className={styles.count}>{folder.countCredit} bộ thẻ</div>

                        <div className="">tạo bởi</div>
                        <div className={styles.avt}>
                            <Link to={`/account`} className="avatar align-items-center d-flex w-auto">
                                <img src={folder.avatar} className="w-px-20 h-auto rounded-circle" />
                            </Link>
                        </div>
                        <Link to={`/account/`} className={styles.name}>
                            <span className="fw-semibold d-block">{folder.createdBy}</span>
                        </Link>
                    </div>
                    
                    <div className={styles.btn}>
                        <Tooltip title="Chia sẻ" placement="top" arrow>
                            <span className='bx bxs-share-alt'></span>
                        </Tooltip>
                        <Tooltip title="Sửa" placement="top" arrow>
                            <span className='bx bxs-pencil'></span>
                        </Tooltip>
                        <Tooltip title="Xóa, Sao chép, ..." placement="top" arrow>
                            <span className='bx bx-dots-horizontal-rounded'></span>
                        </Tooltip>
                    </div>
                </div>
                <div className={styles.title}>
                    <h2 className={styles.name}>
                        <i className={`bx bx-folder ${styles.icon}`}></i>
                        {folder.name}
                    </h2>

                    <div className={styles.descrip}>
                        {folder.description}
                    </div>
                </div>
                

                <div className={` ${styles.search_container} row g-0`}>
                    <div className="combobox col-8">
                        
                    </div>

                    <div className={`d-flex col-4 align-items-center ${styles.box_search}`}>
                        <i className="bx bx-search fs-4 lh-0"></i>
                        <form onSubmit={(e) => handleSearch(e)}>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onBlur={(e) => handleSearch()}
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Tìm kiếm..."
                                aria-label="Tìm kiếm..."
                            />
                        </form>
                    </div>
                </div>

                <div className="row">
                    {listCredit.map((credit, index) => {
                        
                        return (
                            <div className="col-6" key={credit.creditId}>

                            <BoxCredit credit={credit} />
                            {/* <BoxCreditAccount credit={credit} /> */}
                        </div>)
                    })}
                </div>

            </div>
        </>
    )
};