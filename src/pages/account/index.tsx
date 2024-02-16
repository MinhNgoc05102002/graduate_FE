import { useState } from "react";
import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import ListCredit from "~/components/Account/ListCredit";

const cx = classNames.bind(styles);

const LIST_NAVBAR = [
    {
        id: "CREDIT",
        title: "Bộ thẻ",
        component: ListCredit
    },
    {
        id: "FOLDER",
        title: "Thư mục",
        component: null,
    },
    {
        id: "CLASS",
        title: "Lớp học",
        component: null,
    },
    {
        id: "STREAK",
        title: "Lịch sử học tập",
        component: null,
    },
];

export default function Account() {
    const [content, setContent] = useState(LIST_NAVBAR[0]);
    
    return (
        <>
            {/* <!-- Content --> */}
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="header">
                    <div className="row g-0">
                        {/* Avatar */}
                        <div className="col-md-1 col-lg-1 col-sm-2 col-3">
                            <div className={`avatar ${styles.avatar_box}`}>
                                <img src="/src/assets/img/avatars/1.png" className="w-px-75 h-auto rounded-circle" />
                            </div>
                        </div>
                        {/* Username */}
                        <div className={`col-md-11 col-lg-11 col-sm-10 col-9 d-flex align-items-center`}>
                            <h4 className={`fw-bold`}>
                                minhngoc_
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="tab">
                    <div className={cx("navbar")}>
                        <div className={cx("navbar_container")}>
                            {LIST_NAVBAR.map((nav) => {
                                return (
                                    <div key={nav.id} className={cx("navbar_item")} onClick={() => setContent(nav)}>
                                        <span className={cx("", { title_active: nav.id == content.id })}>{nav.title}</span>
                                        <div className={cx("", { underline: nav.id == content.id })}></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>



                <div>
                    {content.component ? <content.component /> : null}
                </div>


            </div>
            {/* <!-- / Content --> */}
        </>
    )
};