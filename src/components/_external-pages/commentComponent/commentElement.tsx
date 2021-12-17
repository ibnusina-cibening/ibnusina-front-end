import {
    Box,
    Button,
    Avatar,
    Divider,
    ListItem,
    TextField,
    Typography,
    ListItemText,
    Skeleton,
    ListItemAvatar
} from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { id } from 'date-fns/locale';

export function CommentLoader(props:{message:string}) {
    return (
        <Box sx={{ pt: 0.5 }}>
            <Box component="span"  sx={{justifyContent: "center", alignItems: "center", display: "flex" }}>
                {props.message}
            </Box>
            <Skeleton />
            <Skeleton width="60%" />
        </Box>
    )
}

// KOMPONEN UNTUK REPLY, TAMPILAN KONTEN KOMENTAR DAN EDIT KOMENTAR 
export function InputComment({ disabled, localValue: localvalue, onChange, comment, id: commentId }: {
    disabled: boolean, localValue: string, onChange: any, comment: any, id: string
}) {
    // untuk reply, field comment tidak diisi / undefined
    // karena itu, timestamp hanya dibuat untuk edit komentar saja
    let timeStamp;
    if (comment) {
        const createdAt = !comment.updatedAt ? comment.createdAt : comment.updatedAt;
        const time = typeof createdAt === 'string' ? parseInt(createdAt) : createdAt;
        timeStamp = formatDistanceToNow(
            new Date(time * 1000),
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
            // mengedit komentar
            <TextField
                fullWidth
                multiline={true}
                id={commentId}
                inputProps={{ localvalue }}
                value={localvalue}
                onChange={onChange}
                size="small"
                placeholder="Tulis komentar"
                sx={{
                    '& fieldset': {
                        borderWidth: `1px !important`,
                        borderColor: (theme:{palette:{grey:any}}) => `${theme.palette.grey[500_32]} !important`
                    }
                }}
            />
        }
        </>
    )
}

export function ButtonComment({ id: commentId, onClick, name, disabled }:
    { id: any, onClick: any, name: string, disabled: boolean }) {
    const buttonSize = name === 'show more' ? 'large' : name === 'submit' ? 'medium' : 'small';
    return (

        <Button
            size={buttonSize}
            disabled={disabled}
            sx={{ position: 'relative', right: 0 }}
            variant={buttonSize == 'small' ? 'text' : 'contained'}
            id={commentId}
            type="button"
            name={name}
            onClick={onClick}
        >{name}</Button>

    )
}

export function InputMain({ formValue: formvalue, onChange }: { formValue: string, onChange: any }) {
    return (
        <TextField
            fullWidth
            multiline={true}
            // id={commentId}
            inputProps={{ formvalue }}
            value={formvalue}
            onChange={onChange}
            size="small"
            placeholder="Tulis komentar"
            sx={{
                '& fieldset': {
                    borderWidth: `1px !important`,
                    borderColor: (theme:{palette:{grey:any}}) => `${theme.palette.grey[500_32]} !important`
                }
            }}
        />
    )
}

export function AddComment({ formValue, onChange, handleClick, isLoggedIn }: {
    formValue: string, onChange: any, handleClick: any, isLoggedIn: boolean
}) {
    return (
        <Box component="div" sx={{ p: 2, border: '1px solid green', width: '100%' }}>
            {isLoggedIn &&
                <Box component="div" sx={{ p: 2, width: '100%' }}>
                    <InputMain
                        formValue={formValue}
                        onChange={onChange}
                    />
                </Box>
            }
            {isLoggedIn &&
                 <Box component="div" sx={{ pt: 0.5, pl:2, width: '100%' }}>
                    <ButtonComment
                        disabled={!formValue ? true : false}
                        id={2}
                        name="submit"
                        onClick={handleClick}
                    />
                </Box>
            }
        </Box>
    )
}