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

  return input.reduce((acc, val, i) => (
    acc + val + units[i] + (i === 2 ? days[new Date(date).getDay()] : '')
  ), '').trim();
}