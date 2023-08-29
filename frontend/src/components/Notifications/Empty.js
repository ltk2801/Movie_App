import { RiMovie2Line } from "react-icons/ri";

export const Empty = ({ message }) => {
  return (
    <div className="flex-colo w-full py-12 px-4 rounded border border-border bg-main gap-4">
      <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
        <RiMovie2Line />
      </div>
      <p className="text-border text-sm">{message}</p>
    </div>
  );
};

export const shortUppercaseId = (id) => {
  return id.slice(0, 8).toUpperCase();
};

export const dateFormat = (data) => {
  // Định dạng ngày tháng năm
  const inputDate = new Date(data);

  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1;
  const year = inputDate.getFullYear();

  const monthNames = [
    "tháng 1",
    "tháng 2",
    "tháng 3",
    "tháng 4",
    "tháng 5",
    "tháng 6",
    "tháng 7",
    "tháng 8",
    "tháng 9",
    "tháng 10",
    "tháng 11",
    "tháng 12",
  ];
  return `${day} ${monthNames[month - 1]} năm ${year}`;
};
