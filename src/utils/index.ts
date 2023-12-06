// Utility function to get the current date in ISO format
export const getCurrentDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatTime(inputTime: string): string {
  const [hours, minutes] = inputTime.split(":");
  const parsedHours = parseInt(hours, 10);

  let period = "AM";
  if (parsedHours >= 12) {
    period = "PM";
  }

  const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
  const formattedTime = `${formattedHours
    .toString()
    .padStart(2, "0")}:${minutes.padStart(2, "0")} ${period}`;

  return formattedTime;
}

export function formatDateToMMDDYY(inputDate: string): string {
  const date = new Date(inputDate);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
