import { Popper, Stack, styled, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import moment from "moment";
import Action from "./Action";
import Header from "./Header";
import Control from "./Control";
import Selector from "./Selector";
import CalendarContext from "./Context";

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
            borderColor: '#FFFFFF',
        },
    },
    '&.active fieldset': {
        borderRadius: '8px',
        borderWidth: '3px',
        borderColor: '#FFFFFF',
    }
});



const Calendar = ({ title, value, setValue }: { title: string, value: string, setValue: (value: string) => void }) => {
    const [selectDate, setSelectDate] = useState(moment())
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = useMemo(() => !!anchorEl, [anchorEl])
    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());
    const [isYear, setIsYear] = useState(false);

    const handlePopoverOpen = (event: React.FocusEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const contextValue = useMemo(() => ({
        value,
        setValue,
        isYear,
        setIsYear,
        year,
        setYear,
        month,
        setMonth,
        selectDate,
        setSelectDate,
    }), [value, setValue, isYear, year, month, selectDate]);


    return (
        <CalendarContext.Provider value={contextValue}>
            <Stack direction={'column'}>
                <CssTextField
                    autoComplete='off'
                    variant="outlined"
                    label={title}
                    type="text"
                    placeholder="mm/dd/yyyy"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: true, style: { color: '#FFFFFF' } }}
                    value={value}
                    onFocus={handlePopoverOpen}
                    className={open ? 'active' : ''}
                />
                <Popper open={open} anchorEl={anchorEl} placement={'bottom-start'}>
                    <Stack bgcolor={'#1B1B1B'} width={320} boxShadow={5} mt={'16px'} borderRadius={'8px'}>
                        <Stack m={1} spacing={1}>

                            <Header />

                            <Control />

                            {!isYear && <Stack direction={'row'} px={'19px'} justifyContent={'space-between'}>
                                {weekDays.map((day) => <div key={day} style={{ color: '#929292', fontSize: '11px' }}>{day}</div>)}
                            </Stack>}

                            <Selector />

                            <Action handlePopoverClose={handlePopoverClose} />
                        </Stack>
                    </Stack>
                </Popper >
            </Stack >
        </CalendarContext.Provider>
    )
}

export default Calendar;