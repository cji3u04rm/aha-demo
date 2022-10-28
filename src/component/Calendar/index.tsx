import { Box, Button, Popper, Stack, styled, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import moment from 'moment';
import { IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

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

const CssIconButton = styled(IconButton)({
    width: '36px',
    height: '36px',
    '& label': {
        fontSize: '11px'
    },
    '&.MuiIconButton-root:hover': {
        backgroundColor: '#FFFFFF',
        '& label': {
            color: 'black',
        }
    },
    '&.select-date': {
        backgroundColor: '#00A3FF',
        '& label': {
            color: '#FFFFFF',
        }
    },
    '&.non-month': {
        '& label': {
            color: '#929292',
        }
    },
    '&.today': {
        borderStyle: 'solid',
        borderColor: '#00A3FF',
        borderWidth: '2px'
    }
});

const CssButton = styled(Button)({
    textTransform: 'none',
    color: '#FFFFFF'
});

const CssYearBox = styled(Box)({
    width: 61,
    borderRadius: '2px',
    fontWeight: 400,
    lineHeight: '24px',
    textAlign: 'center',
    color: '#FFFFFF',
    '&.select-year': {
        backgroundColor: '#00A3FF',
    },
    '&:hover': {
        color: '#111111',
        backgroundColor: '#FFFFFF',
    },
});


const Calendar = ({ title, value, setValue }: { title: string, value: string, setValue: (value: string) => void }) => {
    const [selectDate, setSelectDate] = useState(moment())
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = useMemo(() => !!anchorEl, [anchorEl])
    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month());
    const [yearList, setYearList] = useState(Array.from({ length: 40 }, (_, i) => year - 21 + i))
    const [isYear, setIsYear] = useState(false);

    const handlePopoverOpen = (event: React.FocusEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleClickMon = (add: boolean) => {
        const tempMon = add ? moment([year, month, 1]).add(1, 'M') : moment([year, month, 1]).subtract(1, 'M');

        setYear(tempMon.year())
        setMonth(tempMon.month());
    }

    const handleClickYear = (add: boolean) => {
        const tempMon = add ? moment([year, month, 1]).add(1, 'year') : moment([year, month, 1]).subtract(1, 'year');

        setYear(tempMon.year())
    }

    const MonthWeek = useMemo(() => {
        const maxDate = moment([year, month, 1]).daysInMonth();
        const firstWeek = moment([year, month, 1]).week()
        let LastWeek = moment([year, month, maxDate]).week()

        if (firstWeek > LastWeek) LastWeek = moment([year]).weeksInYear() + 1

        const res = []
        for (let index = firstWeek; index <= LastWeek; index++) {
            res.push(index);
        }

        return res;
    }, [year, month])

    const weekArr = (week: number) => {
        const res = []

        for (let index = 0; index < 7; index++) {
            const tempDate = moment([year]).week(week).day(index)

            res.push({ year: tempDate.year(), month: tempDate.month(), date: tempDate.date() })
        }

        return res
    }

    const yearArr = (year: number) => {
        const res = []
        let tempYearList = [...yearList]

        if (tempYearList.findIndex((item) => item === year) === -1) {
            tempYearList = Array.from({ length: 40 }, (_, i) => year - 21 + i);
            setYearList(Array.from({ length: 40 }, (_, i) => year - 20 + i))
        }
        for (let index = 0; index < 10; index++) {
            res[index] = tempYearList.splice(0, 4)
        }

        return res
    }

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
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

                        <Stack px={2} pb={2} pt={1} spacing={'3px'} style={{ color: '#FFFFFF' }}>
                            <Stack style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>Text</Stack>
                            <Stack style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 700 }}>{moment([year, month, 1]).format('MMM')},&nbsp;{moment([year, month, 1]).format('YYYY')}</Stack>
                        </Stack>

                        <Stack pb={1} direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                            <IconButton size="small" onClick={() => isYear ? handleClickYear(false) : handleClickMon(false)}>
                                <ChevronLeft />
                            </IconButton>

                            <Stack pt={'2px'} style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#FFFFFF' }} onClick={() => { setIsYear(true) }}>
                                <>
                                    {isYear ? <>{moment([year, month, 1]).format('YYYY')} </> :
                                        <>{moment([year, month, 1]).format('MMMM')} {moment([year, month, 1]).format('YYYY')}</>
                                    }
                                </>
                            </Stack>

                            <IconButton size="small" onClick={() => isYear ? handleClickYear(true) : handleClickMon(true)}>
                                <ChevronRight />
                            </IconButton>
                        </Stack>

                        {!isYear && <Stack direction={'row'} px={'19px'} justifyContent={'space-between'}>
                            {weekDays.map((day) => <div key={day} style={{ color: '#929292', fontSize: '11px' }}>{day}</div>)}
                        </Stack>}

                        {!isYear ? <Stack>
                            {MonthWeek.map((week) =>
                                <Stack key={week} direction={'row'} mx={1} justifyContent={'space-between'}>
                                    {weekArr(week).map((day) =>
                                        <CssIconButton
                                            key={day.date}
                                            size='small'
                                            onClick={() => {
                                                setYear(day.year)
                                                setMonth(day.month)
                                                setSelectDate(moment([day.year, day.month, day.date]))
                                            }}
                                            className={day.year === selectDate.year() && day.month === selectDate.month() && day.date === selectDate.date() ? 'select-date' :
                                                moment().year() === day.year && moment().month() === day.month && moment().date() === day.date ? 'today' :
                                                    day.month === month ? 'curr-month' : 'non-month'} >
                                            <label key={day.date} style={{ fontSize: '14px' }}>{day.date}</label>
                                        </CssIconButton>
                                    )}
                                </Stack>)}
                        </Stack> :
                            <Stack spacing={3} py={1} px={2} pb={2} maxHeight={200} overflow='auto'>
                                {yearArr(year).map((item, index) =>
                                    <Stack key={index} direction={'row'} justifyContent={'space-between'} >
                                        {item.map((itemYear =>
                                            <CssYearBox
                                                key={itemYear}
                                                justifyItems={'center'}
                                                alignItems={'center'}
                                                className={itemYear === year ? 'select-year' : ''}
                                                onClick={() => {
                                                    setYear(itemYear)
                                                    setIsYear(false)
                                                }}>
                                                {itemYear}
                                            </CssYearBox>
                                        ))}
                                    </Stack>)}
                            </Stack>}

                        <Stack direction={'row'} justifyContent={'flex-end'} py={'7px'} px={2} spacing={5}>
                            <CssButton variant="text" onClick={handlePopoverClose}>Cancel</CssButton>
                            <CssButton variant="text" onClick={() => {
                                setValue(selectDate.format('MM/DD/YYYY'))
                                handlePopoverClose()
                            }}>OK</CssButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Popper >
        </Stack >)
}

export default Calendar;