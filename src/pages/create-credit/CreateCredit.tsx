import Loading from '~/components/Loading/Index';
import styles from './CreateCredit.module.scss'
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import BoxCreateCard from '~/components/BoxCreateCard/BoxCreateCard';
import * as Yup from 'yup';
import { UseFieldArrayProps, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';

const INIT_VALUE = {
    name: "",
    description: "",
    listCard: [
        {
            question: "",
            answer: "",
            answerLang: "",
            questionLang: "",
            image: "",
            imageFile: null,
        },
        {
            question: "",
            answer: "",
            answerLang: "",
            questionLang: "",
            image: "",
            imageFile: null,
        },
        {
            question: "",
            answer: "",
            answerLang: "",
            questionLang: "",
            image: "",
            imageFile: null,
        },
        {
            question: "",
            answer: "",
            answerLang: "",
            questionLang: "",
            image: "",
            imageFile: null,
        },
        {
            question: "",
            answer: "",
            answerLang: "",
            questionLang: "",
            image: "",
            imageFile: null,
        }
    ]
}

export default function CreateCredit() {
    const [isLoading, setIsLoading] = useState(false);
    const [listCard, setListCard] = useState([1, 2, 4, 5, 6]);

    const [formData, setFormData] = useState(INIT_VALUE);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Hãy nhập tên tài khoản hoặc email'),
        description: Yup.string().required('Hãy nhập mật khẩu')
    });
    

    // const {
    //     register,
    //     control,
    //     handleSubmit,
    //     formState: { errors }
    // } = useForm({ resolver: yupResolver(validationSchema) });

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: { errors }
      } = useForm({
        defaultValues: INIT_VALUE,
        mode: "onChange"
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "listCard", // unique name for your Field Array
      });
    

    const onSubmit = async (formData:any) => {
        // setIsLoading(true);
        // await call api create
        console.log(formData)
        // setIsLoading(false);
      };

    return (
        <>
            <Loading isLoading={isLoading}/>
            <ToastContainer />

            <div className={`container-xxl flex-grow-1 container-p-y px-5`}>
                <div className={styles.title}>
                    <h4 className={styles.name}>
                        Tạo bộ thẻ mới
                    </h4>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Lưu</button>
                </div>

                <form id="formCreate" className="mb-3" method="POST">

                    {/* Input Credit */}
                    <div className="card p-2">

                        <div className={styles.form_credit}>
                            <TextField
                                required
                                id="name"
                                // name="loginName"
                                label="Nhập tên bộ thẻ"
                                fullWidth
                                margin="dense"
                                variant="outlined" 
                                size="small"
                                {...register('name')}
                                error={errors.name ? true : false}
                                helperText={errors.name ? errors.name?.message : ""}
                            />

                            <TextField
                                required
                                id="loginName"
                                // name="loginName"
                                label="Thêm mô tả ..."
                                fullWidth
                                margin="dense"
                                variant="outlined" 
                                size="small"
                                multiline
                                maxRows={4}
                                minRows={3}
                                {...register('description')}
                                error={errors.description ? true : false}
                                helperText={errors.description ? errors.description?.message : ""}
                            />
                        </div>
                    </div>


                    {/* Input FlashCard */}
                    <div className={styles.form_card}>
                        {fields.map((card, index) => {
                            return (
                                <BoxCreateCard 
                                    key={card.id} 
                                    item={card} 
                                    register={register}
                                    ordinal={index}
                                    getValues={getValues}
                                />
                            )
                        })}
                    </div>

                    <div className="d-flex justify-content-sm-end">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Lưu</button>
                    </div>    
                </form>
            </div>
        </>
    )
};
