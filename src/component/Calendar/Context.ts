import moment from 'moment';
import { createContext, useContext } from 'react';

interface CalendarContextModel {
    value: string,
    setValue: (value: string) => void
    isYear: boolean,
    setIsYear: (isYear: boolean) => void,
    year: number,
    setYear: (year: number) => void,
    month: number,
    setMonth: (month: number) => void,
    selectDate: moment.Moment,
    setSelectDate: (month: moment.Moment) => void
}

const defaultValue: CalendarContextModel = {
    value: '',
    setValue: (value: string) => { },
    isYear: false,
    setIsYear: (isYear: boolean) => { },
    year: 0,
    setYear: (year: number) => { },
    month: 0,
    setMonth: (month: number) => { },
    selectDate: moment(),
    setSelectDate: (selectDate: moment.Moment) => { }
};

const CalendarContext = createContext(defaultValue);
export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;