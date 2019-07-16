import React from "react";

interface Props {
    dates: string[];
    date: string;
    onChange: (date: string) => void
}

export const DateSelector: React.FC<Props> = ({ dates, date, onChange }) => {
    return (
        <div className="btn-group-vertical">
            {dates.map(d => <button key={d} className={date === d ? 'btn btn-primary' : 'btn btn-light'} onClick={(e) => onChange(d)}>{d}</button>)}
        </div>
    );
};

export default DateSelector;