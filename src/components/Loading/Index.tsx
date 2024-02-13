import styles from './Loading.module.scss';

export default function Loading(props: any) {
    let {isLoading} = props;
    return (
        <>
            {isLoading ?
                <div className={`${styles.container}`}>

                    <div className="spinner-border spinner-border-lg text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div > 
                </div>
            : null}
        </>
    )
};