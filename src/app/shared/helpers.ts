export const onDateValidation = (date: Date) => {
  let month = date.getUTCMonth() + 1 > 9 ? (date.getUTCMonth() + 1).toString() :  `0${date.getUTCMonth() + 1}`;
  let day = date.getUTCDate() + 1 > 9 ? (date.getUTCDate() + 1).toString() : `0${date.getUTCDate() + 1}`;
  return `${date.getUTCFullYear()}-${month}-${day}`;
}
