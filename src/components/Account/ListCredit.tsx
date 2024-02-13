import { useState } from "react"
import BoxCreditAccount from "./BoxCreditAccount";


// truyền username của user đang đăng nhập vào đây
export default function ListCredit({ }) {
    let [listCredit, setListCredit] = useState();

    return (
        <>
            <div className="divider text-start mb-3 mt-5">
                <div className="divider-text fs-5">Gần đây</div>
            </div>

            <BoxCreditAccount />

            <BoxCreditAccount />

            <div className="divider text-start mb-3 mt-5">
                <div className="divider-text fs-5">Gần đây</div>
            </div>

            <BoxCreditAccount />

            <BoxCreditAccount />
        </>)
};
