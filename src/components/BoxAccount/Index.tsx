import classNames from "classnames/bind";
import styles from "./BoxAccount.module.scss";

/**
 * Box Account Dashboard
 * @returns 
 */
export default function BoxAccount() {
    return (
        <>
            <div className="col-md-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row g-0">
                            <div className="col-md-4 col-lg-3 col-sm-3 col-3">
                                <div className={`avatar ${styles.avatar_box}`}>
                                    <img src="/src/assets/img/avatars/1.png" className="w-px-75 h-auto rounded-circle" />
                                </div>
                            </div>

                            <div className={`col-md-8 col-lg-9 col-sm-9 col-9 ${styles.username}`}>
                                <div>
                                    <h5 className="card-title">Chiến thắng Bạch Đằng</h5>
                                    <p className={`card-text fw-semibold ${styles.card_tag}`}>
                                        <i className="menu-icon tf-icons bx bx-collection"></i>
                                        3 học phần
                                    </p>
                                    <p className={`card-text fw-semibold ${styles.card_tag}`}>
                                        <i className="menu-icon tf-icons bx bx-cube-alt"></i>
                                        99+ lớp học
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};