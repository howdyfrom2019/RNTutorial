export const makeTimeStampToCustomDate = (timestamp) => {
  const current = new Date(timestamp);
  const [year, month, date] = [current.getFullYear(), current.getUTCMonth() + 1, current.getUTCDate()];
  const hour = current.getHours();
  return { year, month, date, hour };
}

/**
 * @date: '2023-01-25 14:15' 형식
 * @output: 2023년 1월 25일 화요일 오후 2시 15분
 * */
export const makeKoreanDateStyle = (date) => {
  const units = ['년 ', '월 ', '일 ', '시 ', '분'];
  const days = ['일요일 ', '월요일 ', '화요일 ', '수요일 ', '목요일 ', '금요일 ', '토요일 '];
  const input = date.split(/-|\s|:/);
  const todaysDay = days[new Date(`${input[0]}-${input[1]}-${input[2]}`).getDay()];

  return input.reduce((acc, val, i) => (
    acc + (i === 3 ? (val > 12 ? `오후 ${addHourToZero(val)}` : `오전 ${val}`) : val) + units[i] + (i === 2 ? todaysDay : '')
  ), '').trim();
}

export const addHourToZero = (hour) => {
  const str = String(Number(hour) - 12);
  return '0'.repeat(2 - str.length) + str;
}
export const extractHour = (date) => {
  const match = String(date).match(/(오전|오후)\s(\d{2}시)/);
  if (!match || match.length === 0) return 'error';
  return match[0];
}