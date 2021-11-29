import utilStyles from '../styles/utils.module.css';

export function InputComment({ disabled, localValue, onChange, id }) {
    return (
        <textarea
            disabled={disabled}
            className={utilStyles.textarea}
            value={localValue}
            onChange={onChange}
            id={id}
        />
    )
}

export function ButtonComment({ id, onClick, name }) {
    return (
        <button
            id={id}
            type="button"
            name={name}
            onClick={onClick}
        >{name}</button>
    )
}

export function InputMain({ formValue, onChange }) {
    return (
        <div className={utilStyles.comment}>
            <textarea
                className={utilStyles.textarea}
                value={formValue}
                onChange={onChange}
            />
        </div>
    )
}

export function AddComment({ showForm, formValue, onChange, handleClick, isLoggedIn }) {
    return (
        <>
            {isLoggedIn &&
                <InputMain
                    formValue={formValue}
                    onChange={onChange}
                />
            }
            {!showForm &&
                <ButtonComment
                    id={1}
                    name="show"
                    onClick={handleClick}
                />
            }

            {isLoggedIn &&
                <ButtonComment
                    id={2}
                    name="submit"
                    onClick={handleClick}
                />
            }
        </>
    )
}