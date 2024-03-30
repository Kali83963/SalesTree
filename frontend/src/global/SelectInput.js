import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Controller } from "react-hook-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SelectInput({ data, control, name }) {

  var dataList;
  if (!Array.isArray(data)) {
    dataList = Object.keys(data);
  } else {
    dataList = data;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Listbox value={field.value} onChange={field.onChange}>
          {({ open }) => (
            <>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-[#F5F7F9] p-3 text-sm border-[#E5E5E5] py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <span
                      className={
                        field.value ? "text-gray-800" : "text-gray-400"
                      }
                    >
                      {field.value || `${name}`}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-600"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white p-3 text-xs border-[#E5E5E5] shadow-lg focus:outline-none">
                    {dataList.map((curr, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-primary text-white" : "text-gray-900",
                            "relative cursor-pointer text-start flex select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={`${curr.toUpperCase()} ${data[curr] || ""}`}
                      >
                        <div className={data[curr] ? "flex-none w-2/6": "flex-1"}>
                          <span>{curr.toUpperCase()}</span>
                        </div>
                        {data[curr] && (
                          <div className="grow w-4/6">
                            <span>{data[curr]}</span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      )}
    />
  );
}

export default SelectInput;
