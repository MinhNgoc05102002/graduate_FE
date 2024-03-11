import { IFlashcardProps } from "~/types/IFlash";
import styles from "./CreditComponent.module.scss";

// export default function Card (props:{flashcard:IFlashcardProps, index:string}) {
export default function Card (props:IFlashcardProps) {
    const flashcard = props.flashcard;

    function handleSpeak(text:string) {
        let utterance = new SpeechSynthesisUtterance(text);
        // utterance.lang = 'ja-JP';
        // const voices = speechSynthesis.getVoices();
        //     const vietnameseVoices = voices.filter(voice => voice.lang == 'ja-JP');
        //     console.log(vietnameseVoices, voices);
            
        //     if (vietnameseVoices.length > 0) {
        //         utterance.voice = vietnameseVoices[0];
        //         console.log('ik');
                
        //     }

        speechSynthesis.speak(utterance);
    }

    return (
        <div className={`${styles.card_container} card row`}>
            <div className={`${styles.question} col-3`}>
                {flashcard?.question}
            </div>
            <div className={styles.divider}></div>
            <div className={`${styles.answer} col-8`}>
                {flashcard?.answer}
                {flashcard?.image ?
                    <div className={`${styles.image}`}>
                        <img className={styles.img} src={flashcard.image} alt="Card image" />
                    </div>
                    : null
                }
            </div>
            <div className={`${styles.btn}`}>
                <button onClick={() => handleSpeak(flashcard?.question)} type="button" className="btn rounded-pill btn-icon ">
                    <span className="bx bx-volume-full"></span>
                    {/* <span className="bx bx-volume-mute"></span> */}
                </button>
            </div>
        </div>
    )
}