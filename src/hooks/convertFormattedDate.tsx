export const convertFormattedDate = (isoTimestamp: string | number | Date) => {
  const dateObject = new Date(isoTimestamp);

  // 年月日を取得
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  // フォーマットした日付
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};
