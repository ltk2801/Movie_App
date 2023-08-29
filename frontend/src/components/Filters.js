import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getAllMoviesAction } from "../redux/Actions/movieAction";

const yearData = [
  { title: "Năm Phát Hành" },
  { title: "2023" },
  { title: "2022" },
  { title: "2021" },
  { title: "2020" },
  { title: "2019" },
  { title: "2018" },
  { title: "2017" },
  { title: "2016" },
  { title: "2015" },
  { title: "2014" },
  { title: "2013" },
  { title: "2012" },
  { title: "2011" },
  { title: "2010" },
  { title: "2009" },
  { title: "2008" },
  { title: "2007" },
  { title: "2006" },
  { title: "2005" },
  { title: "2004" },
  { title: "2003" },
  { title: "2002" },
  { title: "2001" },
  { title: "2000" },
  { title: "1999" },
  { title: "1998" },
  { title: "1997" },
  { title: "1996" },
  { title: "1995" },
  { title: "1994" },
  { title: "1993" },
  { title: "1992" },
  { title: "1991" },
  { title: "1990" },
  { title: "1989" },
  { title: "1988" },
  { title: "1987" },
  { title: "1986" },
];

const timeData = [
  { title: "Thời Lượng Phim" },
  { title: "0 - 30 Phút " },
  { title: "30 - 60 Phút" },
  { title: "60 - 90 Phút" },
  { title: "90 - 120 Phút" },
  { title: "120 - 150 Phút" },
  { title: "150 - 180 Phút" },
  { title: "180 - 210 Phút" },
  { title: "210 - 240 Phút" },
  { title: "240 - 270 Phút" },
];
const rateData = [
  { title: "Đánh Giá" },
  { title: "0 Start " },
  { title: "1 Start " },
  { title: "2 Start " },
  { title: "3 Start " },
  { title: "4 Start " },
  { title: "5 Start " },
];

const LanguageData = [
  { title: "Ngôn Ngữ" },
  { title: "Tiếng Việt" },
  { title: "Tiếng Anh " },
  { title: "Tiếng Trung Quốc " },
  { title: "Tiếng Hàn Quốc " },
  { title: "Tiếng Nhật Bản " },
  { title: "Tiếng Pháp " },
];

const Filters = ({ categories }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "Thể Loại Phim" });
  const [year, setYear] = useState(yearData[0]);
  const [time, setTime] = useState(timeData[0]);
  const [rate, setRate] = useState(rateData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);

  const filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "Thể Loại Phim" }, ...categories]
          : [{ title: "Không tìm thấy thể loại" }],
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguageData,
    },
    {
      value: year,
      onChange: setYear,
      items: yearData,
    },
    {
      value: time,
      onChange: setTime,
      items: timeData,
    },
    {
      value: rate,
      onChange: setRate,
      items: rateData,
    },
  ];

  useEffect(() => {
    if (category?.title !== "No category found") {
      dispatch(
        getAllMoviesAction({
          category: category?.title === "Thể Loại Phim" ? "" : category?.title,
          time: time?.title.replace(/\D/g, ""),
          language: language?.title === "Ngôn Ngữ" ? "" : language?.title,
          rate: rate?.title.replace(/\D/g, ""),
          year: year?.title.replace(/\D/g, ""),
          search: "",
        })
      );
    }
  }, [category, language, year, time, rate, dispatch]);

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800  w-full text-white  bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs ">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaAngleDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-sm shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4  ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncated ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filters;
