import utilStyles from '../styles/utils.module.css';

export function InputComment({ disabled, localValue, onChange, id }:{
    disabled:boolean, localValue:any, onChange:any, id:string}) {
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

export function ButtonComment({ id, onClick, name }:{id:any, onClick:any, name:string}) {
    return (
        <button
            id={id}
            type="button"
            name={name}
            onClick={onClick}
        >{name}</button>
    )
}

export function InputMain({ formValue, onChange }:{formValue:string, onChange:any}) {
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

export function AddComment({ formValue, onChange, handleClick, isLoggedIn }:{
    formValue:string, onChange:any, handleClick:any, isLoggedIn:boolean}) {
    return (
        <>
            {isLoggedIn &&
                <InputMain
                    formValue={formValue}
                    onChange={onChange}
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