import React, { useState, useEffect } from 'react';
import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css';

export default function Comment({ data }: { data: String }) {
    const [commentList, setCommentList] = useState([]);
    // const [isDisabled, setIsDisabled] = useState(false);
    const [formValue, setFormValue] = useState('tulis komentar');
    const [showForm, setShowForm] = useState(false);
    // const [index, setIndex] = useState(0);

    const handleClick = (e) => {
        if (e.target.name === 'add') {
            setShowForm(!showForm)
            setFormValue('tulis komentar');
        }
        if (e.target.name === 'submit') {
            setCommentList([...commentList, ...[formValue]]);
            setShowForm(!showForm)
        }
    };
    const onChange = (e) => {
        setFormValue(e.target.value);
    }

    return (
        <div className={styles.container}>
            {showForm &&
                <div className={utilStyles.comment}>
                    <textarea
                        className={utilStyles.textarea}
                        value={formValue}
                        onChange={onChange}
                    />
                </div>}
            {!showForm ?
                <button type="button" name="add" onClick={handleClick}>
                    Tambahkan komentar
                </button> :
                <button type="button" name="submit" onClick={handleClick}>
                    kirim
                </button>
            }
            <div>
                <span>--------------------------------------</span>
                {
                    commentList.map((index, d) => (
                        <div className={utilStyles.comment} key={d}>
                            <textarea
                                className={utilStyles.textarea}
                                value={d}
                                disabled={true}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}