import TextField from "@mui/material/TextField";
import styles from "./BoxCreateCard.module.scss";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";

export default function BoxCreateCard(props:any) {
    const {item, ordinal, register} = props;
    const [selectedFile, setSelectedFile] =  useState();
    const [preview, setPreview] = useState("");

    // for input preview img
    const { onChange, onBlur, name, ref } = register(`listCard.${ordinal}.imageFile`);

    useEffect(() => {
        if (!selectedFile) {
            setPreview("")
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    
    const handleSelectImg = (e:any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])

        onChange(e);
    }

    return (
        <>
            <div className={`${styles.container} card my-4`}>
                <div className={`${styles.head}`}>
                    <div className={styles.stt}>
                        {ordinal}
                    </div>
                    <div className={styles.icon}>
                        <span className='bx bx-trash'></span>
                    </div>
                </div>
                <hr />
                <div className={`${styles.form} row`}>
                    <div className="word row col-11">
                        <div className="col">
                            <TextField
                                required
                                label="Thuật ngữ"
                                fullWidth
                                variant="standard" 
                                size="small"
                                {...register(`listCard.${ordinal}.question`)} // trong register này có cả  { onChange, onBlur, name, ref } = register('firstName'); rồi nên k cần thêm j nữa 
                                // error={errors.loginName ? true : false}
                                // helperText={errors.loginName ? errors.loginName?.message : ""}
                            />
                        </div>

                        <div className="col">
                            <TextField
                                required
                                id="loginName"
                                label="Định nghĩa"
                                fullWidth
                                variant="standard" 
                                size="small"
                                {...register(`listCard.${ordinal}.answer`)}
                            />
                        </div>
                    </div>
                    <div className="col-1">
                        <Tooltip title="Chọn ảnh" placement="top" arrow>
                            <label htmlFor={`listCard.${ordinal}.imageFile`} className={styles.image} style={{backgroundImage: `url(${preview ? preview : "./src/assets/img/icons/image-add-icon.png"}`}}>
                            </label>
                        </Tooltip>
                        <div style={{display: "none"}}>
                            <TextField
                                required
                                id= {`listCard.${ordinal}.imageFile`}
                                type="file"
                                onChange={handleSelectImg}
                                onBlur={onBlur} // assign onBlur event
                                name={name} // assign name prop
                                ref={ref} // assign ref prop

                                // {...register(`listCard.${ordinal}.imageFile`)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
