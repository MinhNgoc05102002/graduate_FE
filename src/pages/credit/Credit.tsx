import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactFlipCard from 'reactjs-flip-card';
import Loading from "~/components/Loading/Index";
import { useAppSelector } from "~/redux/hook";
import { inforUser } from "~/redux/slices/authSlice";
import { Post } from "~/services/axios";
import { ICredit } from "~/types/ICredit";
import { CheckResponseSuccess, GetIdFromCurrentPage, findNotifDate } from "~/utils/common";
import styles from "./Credit.module.scss";

// import required modules
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import ListCard from "~/components/Credit/Detail";
import SimpleListMenu from "~/components/Credit/Memory";
import { IFlashcard } from "~/types/IFlash";
import Swal from 'sweetalert2'
import 'animate.css';
import NotFound from "../notfound/NotFound";

const LIST_LEARN_BTN = [
    {
        name: "Thẻ ghi nhớ",
        icon: "bx bxs-collection"
    },
    {
        name: "Học",
        icon: "bx bxs-book-reader"
    },
    {
        name: "Kiểm tra",
        icon: "bx bxs-edit-alt"
    },
    {
        name: "Ghép thẻ",
        icon: "bx bxs-extension"
    },
]

const MEMORY = [
    'Trí nhớ 1 ngày',
    'Trí nhớ 1 tuần',
    'Trí nhớ 1 tháng',
  ];

export default function Credit() {
    const userData = useAppSelector(inforUser);
    const [isLoading, setIsLoading] = useState(false);
    const creditId = GetIdFromCurrentPage();
    const [credit, setCredit] = useState<ICredit|null>(null);
    const [listFlashcard, setListFlashcard] = useState<IFlashcard[]>([]);
    const [currentCard, setCurrentCard] = useState<IFlashcard|null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(2);
    const [isFront, setIsFront] = useState<boolean>(true);

    useEffect(() => {
        if (creditId) {
            getStartupData();
        }
    }, [creditId]);

    const getStartupData = async () => {
        setIsLoading(true);

        await Promise.all([
            getInfoCredit(),
            getListFlashcard(),
        ]).then((response: any) => {
            // if (isEditMode) saveDataEdit(response[0], response[1], response[2], response[3]);
        });

        setIsLoading(false);
    }

    const getInfoCredit = () => {
        Post(
            "/api/Credit/get-credit-by-id", 
            creditId, 
            // userData?.token ?? ""
        ).then((res) => {
            if(CheckResponseSuccess(res)) {
                let credit = res?.returnObj;
                if (credit) {
                    setCredit(credit);
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
    }; 

    const getListFlashcard = () => {
        Post(
            "/api/Flashcard/get-flashcard-by-creditid", 
            {
                username: userData?.username,
                creditId: creditId
            }, 
            // userData?.token ?? ""
        ).then((res) => {
            if(CheckResponseSuccess(res)) {
                let flashcards = res?.returnObj;
                console.log(flashcards)
                if (flashcards) {
                    setListFlashcard(flashcards);
                    setCurrentCard(flashcards[0]);
                    setCurrentIndex(0)
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
    }; 

    const handleLearn = (learned:boolean) => {
        // call api cập nhật trạng thái thẻ: 
        //...
        
        let id = document.getElementById('flip_card');
        Swal.fire({
            icon: learned ? "success" : "error",
            title: learned ? "Đã biết" : "Đang học",
            showConfirmButton: false,
            timer: 600,
            target: id,
            customClass: {
                'container': styles.trial_swal_container,
                // 'popup': styles.trial_swal_popup
              },
            showClass: {
                popup: `
                  animate__animated
                  animate__faster
                  fadeIn
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__faster
                  ${learned ? "animate__backOutRight" : "animate__backOutLeft"}
                `
              }
          });

        if (currentIndex + 1 < listFlashcard.length) {
            setCurrentCard(listFlashcard[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
            setIsFront(true);
        }
    }

    const Card = (props:{isFront:boolean, flashcard:IFlashcard|null}) => {
        return (
            <>
                <div className={`card ${styles.box_padding} ${styles.flashcard_box}`}>
                    {props.isFront ? <div className={styles.audio_btn}>
                        <button onClick={(e) => {e.stopPropagation();}} type="button" className="btn rounded-pill btn-icon ">
                            <span className="bx bx-volume-full"></span>
                            {/* <span className="bx bx-volume-mute"></span> */}
                        </button>
                    </div>: null}
                    <div className={styles.content}>
                        {props.isFront ? props.flashcard?.question : props.flashcard?.answer}
                    </div>
                    {!props.isFront ?
                        <div className={styles.image}>
                            <img className={styles.img} src={props.flashcard?.image} alt="Card image" />
                        </div>
                    :null}
                </div>
            </>
        )
    }

    if (!credit) {
        return (
            <>
                {isLoading ? null : <NotFound />}
                <Loading isLoading={isLoading}/>
                <ToastContainer />
            </>
        )
    }

    return (<>
        
        <Loading isLoading={isLoading}/>
        <ToastContainer />
        <div className={`container-xxl flex-grow-1 container-p-y ${styles.container}`}>
            <h2 className="fw-bold">{credit?.name}</h2>

            {/* Btn chức năng học */}
            <div className={`${styles.learn_btn}`}>
                {LIST_LEARN_BTN.map((item) => (
                    <div key={item.name} className={` col-md-3 col-lg-3 col-6 col-sm-6 my-1 `}>
                        <div className={`card mx-2 ${styles.box_padding} hoverable cursor-pointer`}>
                            <h5 className={`my-1 ${styles.title}`}>
                                <i className={`fs-3 ${item.icon} ${styles.learn_icon}`}></i>
                                {item.name}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>


            <div id="flip_card" className={styles.flip_card}>
                <ReactFlipCard
                    // frontStyle={style.card}
                    // backStyle={style.card}
                    // containerStyle={{position: 'absolute'}}
                    containerCss={styles.flashcard}
                    onClick={() => setIsFront((prev) => !prev)}
                    direction='vertical'
                    flipTrigger="onClick"
                    frontComponent={<Card isFront = {isFront} flashcard={currentCard}/>}
                    backComponent={<Card isFront = {isFront} flashcard={currentCard}/>}
                    />
            </div>
            <div className={`${styles.bottom}`}>
                <div className={`${styles.flashcard_info}`}>
                    <div></div>

                    <div className={`${styles.paging}`}>
                        <Tooltip title="Đang học" placement="top" arrow>
                            {/* <Button>Arrow</Button> */}
                            <button onClick={() => handleLearn(false)} className={`${styles.btn}`} type="button" >
                                <span className="bx bx-x"></span>
                            </button>
                        </Tooltip>
                        <span className={`${styles.page}`}> {currentIndex + 1} / {listFlashcard.length} </span>
                        <Tooltip title="Đã biết" placement="top" arrow>
                            <button onClick={() => handleLearn(true)} className={`${styles.btn}`} type="button" >
                                <span className="bx bx-check"></span>
                            </button>
                        </Tooltip>
                    </div>

                    <div className={`${styles.setting}`}>
                        <button type="button" className="btn rounded-pill btn-icon">
                            <span className="bx bx-cog"></span>
                        </button>
                    </div>
                </div>

                <LinearProgress className={`${styles.progress}`} variant="determinate" value={((currentIndex + 1)/listFlashcard.length) * 100} />
                
                <SimpleListMenu memories={MEMORY}/>
            </div>


            <div className={styles.author}>
                <Link to={`/account/${credit?.createdBy}`}>
                    <div className="d-flex">
                        <div className="me-3">
                            <div className="avatar">
                                <img src={credit?.avatar} className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </div>
                        <div className="">
                            <span className={`${styles.info} fw-semibold d-block`}>{credit?.createdBy}</span>
                            <small className="text-muted">Đã tạo {findNotifDate(credit?.createdAt)}</small>
                        </div>
                    </div>
                </Link>

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
            {/* <Box sx={{ width: '100%' }}> */}
            {/* </Box> */}
            {/* Thẻ Flashcard */}
            {/* <button onClick={() => swiper.slideNext()}>Slide to the next slide</button> */}
            <>
                {/**/}
            </>


            <div className={styles.detail}>
                <div className={styles.title}>Thuật ngữ trong bộ thẻ này ({listFlashcard.length}) </div>
            
                <ListCard flashcards = {listFlashcard} isLearned={credit.isLearned}/>
            </div>

        </div>
    </>)
};
