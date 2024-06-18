import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const formatDate = (date: string) => {
  const formattedDate = dayjs(date, "YYYY-MM-DD").format("YYYY년M월D일");
  return formattedDate;
};
