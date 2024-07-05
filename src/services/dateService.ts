export function getTodayString(): string {
  const date = new Date(); // Today's date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getAYearAgoString(): string {
  const today = new Date(); // Today's date
  const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));

  const year = lastYear.getFullYear();
  const month = String(lastYear.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(lastYear.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
