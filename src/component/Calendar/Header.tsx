import { Stack } from "@mui/material";
import moment from "moment";
import { useCalendarContext } from "./Context";


const Header = () => {
    const { year, month } = useCalendarContext();

    return (
        <Stack px={2} pb={2} pt={1} spacing={'3px'} style={{ color: '#FFFFFF' }}>
            <Stack style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>Text</Stack>
            <Stack style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 700 }}>{moment([year, month, 1]).format('MMM')},&nbsp;{moment([year, month, 1]).format('YYYY')}</Stack>
        </Stack>)
}

export default Header;