import { Stack, styled, TextField } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Popper from '@mui/material/Popper';
import { useMemo, useState } from "react";

const CssTextField = styled(TextField)({
    width: '335px',
    '& input': {
        fontFamily: 'Ubuntu',
        lineHeight: '18px',
        '&[value=""]': {
            color: '#FFFFFF4D',
        }
    },
    '& label': {
        fontFamily: 'Ubuntu',
        lineHeight: '18px',
        letterSpacing: '0.4px',
        color: '#FFFFFF',
        marginTop: '3px',
    },
    '& label.Mui-focused': {
        fontFamily: 'Ubuntu',
        lineHeight: '18px',
        letterSpacing: '0.4px',
        color: '#FFFFFF',
        marginTop: '3px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '8px',
            borderWidth: '3px',
            borderColor: '#FFFFFF80',
        },
        '&:hover fieldset': {
            borderRadius: '8px',
            borderWidth: '3px',
            borderColor: '#FFFFFF',
        },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& fieldset': {
            borderRadius: '8px',
            borderWidth: '3px',
            borderColor: '#00A3FF',
        },
    },
});

const renderItem = (status: boolean, text: string) => (
    <Stack key={text} direction={'row'} alignItems='center' py={'8px'} spacing={'10px'}>
        {status ?
            <CheckCircleIcon style={{ color: '#00D1FF' }} /> :
            <CheckCircleOutlineIcon style={{ color: '#565656' }} />
        }
        <div style={{ color: '#FFFFFF', whiteSpace: 'pre', fontSize: '14px', fontWeight: 400, letterSpacing: '0.25px' }}>
            {text}
        </div>
    </Stack>
)

const checkUppercase = (text: string) => {
    const uppercaseReg = new RegExp(/[A-Z]{1}/);
    return uppercaseReg.test(text)
}

const checkLowercase = (text: string) => {
    const lowercaseReg = new RegExp(/[a-z]{1}/);
    return lowercaseReg.test(text)
}

const checkNumber = (text: string) => {
    const numberReg = new RegExp(/[0-9]{1}/);
    return numberReg.test(text)
}

const checkSpecial = (text: string) => {
    const specialReg = new RegExp(/[\W]{1}/);
    return specialReg.test(text)
}

const checkLength = (text: string) => (text.length >= 8)


const PasswordInput = ({ title, password, setPassword }: { title: string, password: string, setPassword: (password: string) => void }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = useMemo(() => !!anchorEl, [anchorEl])

    const handlePopoverOpen = (event: React.FocusEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const validationStatus = useMemo(() =>
    ([
        { status: checkUppercase(password), text: 'Have at least one uppercase letter' },
        { status: checkLowercase(password), text: 'Have at least one lowercase letter' },
        { status: checkNumber(password), text: 'Have at least one number' },
        {
            status: checkSpecial(password), text: `Have at least one special character\n(!@#$...etc)`
        },
        { status: checkLength(password), text: 'Longer than 8 characters' },
    ])
        , [password])

    return (
        <Stack direction={'column'}>
            <CssTextField
                autoComplete='off'
                variant="outlined"
                label={title}
                type="password"
                placeholder={title}
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { color: '#FFFFFF' } }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePopoverOpen}
                onBlur={handlePopoverClose}
            />
            <Popper open={open} anchorEl={anchorEl}>
                <Stack bgcolor={'#242424'} width={335} boxShadow={10} mt={'20px'} borderRadius={'8px'} >
                    <Stack px={'12px'} py={'8px'}>
                        {validationStatus.map((item) => renderItem(item.status, item.text))}
                    </Stack>
                </Stack>
            </Popper>
        </Stack>)
}

export default PasswordInput;