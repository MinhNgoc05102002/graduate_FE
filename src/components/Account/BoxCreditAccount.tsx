import { ICredit, IProps } from "~/types/ICredit";


export default function BoxCreditAccount(props:IProps) {
    const credit = props.credit;
    
    return (
    <div className="card mb-2">
        <div style={{ padding: '0.5rem 1rem' }}>
            <div style={{ marginBottom: '2px' }} className="">{credit.countFlashcard > 99 ? '99+' : credit.countFlashcard} thuật ngữ</div>
            <h5 style={{ marginBottom: '5px' }}>{credit.name}</h5>
        </div>
    </div>
    )
};
