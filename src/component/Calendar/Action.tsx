import { Button, Stack, styled } from "@mui/material";
import { useCalendarContext } from "./Context";


const CssButton = styled(Button)({
    textTransform: 'none',
    color: '#FFFFFF'
});


const Action = ({ handlePopoverClose }: { handlePopoverClose: () => void }) => {
    const { setValue, selectDate } = useCalendarContext()

    return (
        <Stack direction={'row'} justifyContent={'flex-end'} py={'7px'} px={2} spacing={5}>
            <CssButton variant="text" onClick={handlePopoverClose}>Cancel</CssButton>
            <CssButton variant="text" onClick={() => {
                setValue(selectDate.format('MM/DD/YYYY'))
                handlePopoverClose()
            }}>OK</CssButton>
        </Stack>)
}

export default Action;