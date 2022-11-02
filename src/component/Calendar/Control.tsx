import { IconButton, Stack, styled } from "@mui/material";
import moment from "moment";
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useCalendarContext } from "./Context";




const Control = () => {
    const { isYear, setIsYear, year, setYear, month, setMonth } = useCalendarContext();

    const handleClickMon = (add: boolean) => {
        const tempMon = add ? moment([year, month, 1]).add(1, 'M') : moment([year, month, 1]).subtract(1, 'M');

        setYear(tempMon.year())
        setMonth(tempMon.month());
    }

    const handleClickYear = (add: boolean) => {
        const tempMon = add ? moment([year, month, 1]).add(1, 'year') : moment([year, month, 1]).subtract(1, 'year');

        setYear(tempMon.year())
    }

    return (
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
        </Stack>)
}

export default Control;