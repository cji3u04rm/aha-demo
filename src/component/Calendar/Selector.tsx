import { Box, IconButton, Stack, styled } from "@mui/material";
import moment from "moment";
import { useMemo, useState } from "react";
import { useCalendarContext } from "./Context";



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

const Selector = () => {
    const { isYear, setIsYear, year, setYear, month, setMonth, selectDate, setSelectDate } = useCalendarContext();
    const [yearList, setYearList] = useState(Array.from({ length: 40 }, (_, i) => year - 21 + i))

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


    return (
        !isYear ? <Stack>
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
            </Stack>
    )
}

export default Selector;