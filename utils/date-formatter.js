import dayjs from 'dayjs'

export function getPreviousMonth(date) {
  return dayjs(date).subtract(1, 'month')
}
export function getNextMonth(date) {
  return dayjs(date).add(1, 'month')
}
export function today() {
  return dayjs()
}
export function getMonthYear(date) {
  return dayjs(date).format('MMMM') + '-' + dayjs(date).format('YYYY')
}