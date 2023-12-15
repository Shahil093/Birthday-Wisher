import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Generate = () => {
    const [name, setName] = useState('');
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [link, setLink] = useState('');
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const calculateRemainingTime = () => {
            const currentDate = new Date();
            const birthdayDate = new Date();

            // Set the year for the next occurrence
            birthdayDate.setFullYear(currentDate.getFullYear() + 1);

            // Set day, month, hour, minute for the birthday
            birthdayDate.setMonth(month - 1); // Months are zero-based
            birthdayDate.setDate(day);
            birthdayDate.setHours(hour, minute, 0, 0);

            const timeDifference = birthdayDate - currentDate;

            if (timeDifference > 0) {
                setRemainingTime(timeDifference);
            } else {
                setRemainingTime(null);
            }
        };

        calculateRemainingTime();
    }, [day, month, hour, minute]);

    const generateLink = () => {
        setLink(
            `https://birthday-wisher.netlify.app/birthday/${name}/${day}/${month}/${hour}/${minute}`
        );
    };

    return (
        <div className='page'>
            <h1>Generate Here</h1>
            <div className='form'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    id='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='day'>Day:</label>
                <input
                    type='number'
                    id='day'
                    placeholder='Enter Day (1-31)'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    max={31}
                    min={1}
                />
                <label htmlFor='month'>Month:</label>
                <select id='month' value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value=''>Select Month</option>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
                <label htmlFor='hour'>Hour:</label>
                <input
                    type='number'
                    id='hour'
                    placeholder='Enter Hour (0-23)'
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    max={23}
                    min={0}
                />
                <label htmlFor='minute'>Minute:</label>
                <input
                    type='number'
                    id='minute'
                    placeholder='Enter Minute (0-59)'
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    max={59}
                    min={0}
                />
            </div>
            <button className='btn' onClick={() => generateLink()}>
                Generate Link
            </button>

            {link !== '' ? (
                <>
                    <p className='gen-link'>{link}</p>
                    {remainingTime !== null ? (
                        <p className='remaining-time'>
                            Remaining time: {formatRemainingTime(remainingTime)}
                        </p>
                    ) : null}
                    <Link to={`birthday/${name}/${day}/${month}/${hour}/${minute}`}>
                        <button className='btn'>Visit Link</button>
                    </Link>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

const formatRemainingTime = (timeInMilliseconds) => {
    const days = Math.floor(timeInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeInMilliseconds % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default Generate;
