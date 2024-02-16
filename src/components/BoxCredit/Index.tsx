import { ICredit, IProps } from "~/types/ICredit";
import styles from "./BoxCredit.module.scss";
/**
 * Box Credit Dashboard
 * @returns 
 */


// export default function BoxCredit(credit:ICredit) {

export default function BoxCredit(props:IProps) {
    const credit = props.credit;
    return (
        <>
            <div className="col-md-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row g-0">
                            {/* nếu có ảnh thì col-md-9, ko có ảnh thì col-md-12 */}
                            <div className="col-md-12" style={{minHeight: '5.5rem'}}>
                                <h5 className="card-title">{credit?.name}</h5>
                                <p className={`card-text fw-semibold ${styles.card_tag}`}>
                                    {credit?.countFlashcard} thuật ngữ
                                </p>
                            </div>
                            {/* <div style={{display: 'none'}} className="col-md-3 d-lg-block">
                                <img className="card-img card-img-right" src="./src/assets/img/elements/17.jpg" alt="Card image" />
                            </div> */}

                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar align-items-center d-flex">
                                        <img src={credit?.avatar} className="w-px-30 h-auto rounded-circle" />
                                    </div>
                                </div>
                                <div className="flex-grow-1 align-items-center d-flex">
                                    <span className="fw-semibold d-block">{credit?.createdBy}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
