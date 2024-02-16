import classNames from "classnames/bind";
import styles from "./BoxAccount.module.scss";

/**
 * Box Account Dashboard
 * @returns 
 */
export default function BoxAccount(props:any) {
    const {account} = props;
    return (
        <>
            <div className="col-md-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row g-0">
                            <div className="col-md-4 col-lg-3 col-sm-3 col-3">
                                <div className={`avatar ${styles.avatar_box}`}>
                                    <img src={account.avatar} className="w-px-75 h-auto rounded-circle" />
                                </div>
                            </div>

                            <div className={`col-md-8 col-lg-9 col-sm-9 col-9 ${styles.username}`}>
                                <div>
                                    <h5 className="card-title">{account.username}</h5>
                                    <p className={`card-text fw-semibold ${styles.card_tag}`}>
                                        <i className="menu-icon tf-icons bx bx-collection"></i>
                                        {account.countCredit > 99 ? '99+' : account.countCredit} học phần
                                    </p>
                                    <p className={`card-text fw-semibold ${styles.card_tag}`}>
                                        <i className="menu-icon tf-icons bx bx-cube-alt"></i>
                                        {account.countClass > 99 ? '99+' : account.countClass} lớp học
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