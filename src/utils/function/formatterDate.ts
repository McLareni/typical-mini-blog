export function formatterDate(
  mode: "ONLY_DATE" | "WITH_TIME",
  date?: Date | string
): string {
  let formattedDate = "";

  if (!date) {
    return formattedDate;
  }

  formattedDate += `${date.toString().slice(0, 10)}`;
  if (mode === "ONLY_DATE") {
    return formattedDate;
  }

  formattedDate += `${date.toString().slice(11, 16)}`;

  return formattedDate;
}
