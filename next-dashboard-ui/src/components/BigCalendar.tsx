'use client';
import { Calendar, momentLocalizer, Views, View} from 'react-big-calendar';
import moment from 'moment';
import { calendarEvents } from '@/lib/data';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment);
// 지난주 
const lastWeekStart = moment().subtract(1, 'weeks').startOf('week').toDate();
const tempraryDate = new Date(2024, 7, 12);

const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);
    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };
    return (
        <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor='start'
            endAccessor='end'
            views={['work_week', 'day']}
            view={view}
            style={{ height: '98%' }}
            onView = {handleOnChangeView}
            min={new Date(2024,1,0,8, 0, 0)}
            max={new Date(2025,1,0,20, 0, 0)}
            defaultDate={tempraryDate}
            
        />
    );
};

export default BigCalendar;
