import utilStyles from '../styles/utils.module.css';
import {
    Box,
    Button,
    Avatar,
    Divider,
    ListItem,
    TextField,
    Typography,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
// import FormatDate from '../lib/fromatDate';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { id } from 'date-fns/locale';

// KOMPONEN UNTUK REPLY, TAMPILAN KONTEN KOMENTAR DAN EDIT KOMENTAR 
export function InputComment({ disabled, localValue, onChange, comment, id: commentId }: {
    disabled: boolean, localValue: string, onChange: any, comment: any, id: string
}) {
    // untuk reply, field comment tidak diisi / undefined
    // karena itu, timestamp hanya dibuat untuk edit komentar saja
    let timeStamp;
    if (comment) {
        const createdAt = !comment.createdAt ? comment.updatedAt : comment.createdAt;
        timeStamp = formatDistanceToNow(
            new Date(createdAt * 1000),
            { includeSeconds: true, locale: id }
        )
    }

    return (
        <>{disabled ?
            <ListItemText
                // MENAMPILKAN KOMENTAR 
                // timestamp terisi 
                primary={comment.identity.callName}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={
                    <>
                        <Typography
                            gutterBottom
                            variant="caption"
                            sx={{
                                display: 'block',
                                color: 'text.disabled'
                            }}
                        >
                            {comment.updatedAt && 'diupdate: '}
                            {timeStamp + ' yang lalu'}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {comment.content}
                        </Typography>
                    </>
                }
            />
            :
            // REPLY KOMENTAR / EDIT KOMENTAR
            <textarea
                disabled={disabled}
                className={utilStyles.textarea}
                value={localValue}
                onChange={onChange}
                id={commentId}
            />
            // <TextField
            //     fullWidth 
            //     id={commentId}
            //     inputProps={{localValue}}
            //     // inputRef = {localValue}
            //     onChange={onChange}
            //     size="small"
            //     // placeholder="Write comment"
            //     sx={{
            //         '& fieldset': {
            //             borderWidth: `1px !important`,
            //             borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
            //         }
            //     }}
            // />
        }
        </>
    )
}

export function ButtonComment({ id: commentId, onClick, name }: { id: any, onClick: any, name: string }) {
    return (
        <button
            id={commentId}
            type="button"
            name={name}
            onClick={onClick}
        >{name}</button>
    )
}

export function InputMain({ formValue, onChange }: { formValue: string, onChange: any }) {
    return (
        <div>
            <textarea
                // className={utilStyles.textarea}
                value={formValue}
                onChange={onChange}
            />
        </div>
    )
}

export function AddComment({ formValue, onChange, handleClick, isLoggedIn }: {
    formValue: string, onChange: any, handleClick: any, isLoggedIn: boolean
}) {
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