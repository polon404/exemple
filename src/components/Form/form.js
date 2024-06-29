import React, { useState } from 'react';
import './form.css';
import {validateDateOfBirth, validateFullName, validatePhoneNumber, validateEmail, validateFutureDate} from './utils.js'

const MainForm = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [futureDate, setFutureDate] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [futureDateError, setFutureDateError] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [agree, setAgree] = useState(true);
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');

  const handleStartTimeChange = (value) => {
    setStartTime(value);
      if (value.trim() === '') {
        setStartTimeError('Время начала не может быть пустым');
      } else {
      setStartTimeError('');
      }
    };

const handleEndTimeChange = (value) => {
  setEndTime(value);
  if (value.trim() === '') {
    setEndTimeError('Время конца не может быть пустым');
  } else if (new Date(value) - new Date(startTime) < 3600000) {
    setEndTimeError('Время конца должно быть не менее чем на час больше времени начала');
  } else {
    setEndTimeError('');
  }
};
  const handleFullNameChange = (value) => {
    setFullName(value);
    if (value.trim() === '') {
      setFullNameError('ФИО не может быть пустым');
    } else if (!validateFullName(value)) {
      setFullNameError('Пожалуйста, введите корректное ФИО (хотя бы два слова кириллицей)');
    } else {
      setFullNameError('');
    }
  };

  

  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    let match = cleaned.match(/^(7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      let intlCode = (match[1] ? '+7' : '');
      return [intlCode, match[2], match[3], match[4], match[5]].filter(Boolean).join('-');
    }
    return value;
  };

  const handlePhoneNumberChange = (value) => {
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);

    if (value.trim() === '') {
      setPhoneNumberError('Номер телефона не может быть пустым');
    } else {
      setPhoneNumberError('');
    }
  };

  const [futureTime, setFutureTime] = useState('');
  const [futureTimeError, setFutureTimeError] = useState('');
  
  const handleFutureTimeChange = (value) => {
    setFutureTime(value);
    if (value.trim() === '') {
      setFutureTimeError('Время не может быть пустым');
    } else {
      setFutureTimeError('');
    }
  };

  const handleFutureDateChange = (value) => {
    setFutureDate(value);
    if (value.trim() === '') {
      setFutureDateError('Дата не может быть пустой');
    } else if (!validateFutureDate(value)) {
      setFutureDateError('Пожалуйста, введите дату, которая как минимум следующий день от текущего');
    } else {
      setFutureDateError('');
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'fullName':
        handleFullNameChange(value);
        break;
      
      case 'phoneNumber':
        handlePhoneNumberChange(value);
        break;
      
      case 'futureDate':
        handleFutureDateChange(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Дополнительная проверка перед отправкой формы, если нужно
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="form">
        <h1>Название формы</h1>
        <div className="formGroup">
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => handleFullNameChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="Иван Иванов"
            required
          />
          <label htmlFor="fullName" className="label sr-only">ФИО</label>
          {fullNameError && <p className="error">{fullNameError}</p>}
        </div>
        
        <div className="formGroup">
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="+7-900-000-00-00"
            required
          />
          <label htmlFor="phoneNumber" className="label sr-only">Номер телефона</label>
          {phoneNumberError && <p className="error">{phoneNumberError}</p>}
        </div>
        <div className="formGroup">
  <input
    type="datetime-local"
    id="startTime"
    value={startTime}
    onChange={(e) => handleStartTimeChange(e.target.value)}
    onBlur={handleBlur}
    required
  />
  <label htmlFor="startTime" className="label">Время начала</label>
  {startTimeError && <p className="error">{startTimeError}</p>}
</div>

<div className="formGroup">
  <input
    type="datetime-local"
    id="endTime"
    value={endTime}
    onChange={(e) => handleEndTimeChange(e.target.value)}
    onBlur={handleBlur}
    required
  />
  <label htmlFor="endTime" className="label">Время конца</label>
  {endTimeError && <p className="error">{endTimeError}</p>}
</div>
<div className="formGroup">
  <input
    type="checkbox"
    id="agree"
    checked={agree}
    onChange={(e) => setAgree(e.target.checked)}
    required
  />
  <label htmlFor="agree" className="label">Согласен с условиями</label>
</div>
        
        <button type="submit">Отправить</button>
      </form>
    </main>
  );
};

export default MainForm;
