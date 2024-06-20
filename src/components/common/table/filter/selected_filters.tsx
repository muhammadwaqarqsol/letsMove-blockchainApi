import { useState } from 'react';
import { Button } from '~/components/ui/button';

export default function SelectedFilters({
  filterValue,
  setValue,
  setIsClear,
  setIsClearValue,
}: any) {
  console.log('setting val : ', filterValue);

  const handleClearData = () => {
    setIsClear(true);
    setValue({});
  };

  const handleDeleteFilter = (key: any) => {
    // Create a copy of the current state object
    const updatedFilterValue = { ...filterValue };

    // Check if the key exists before attempting to delete
    if (updatedFilterValue.hasOwnProperty(key)) {
      // Delete the key from the copied object
      setIsClearValue({ [key]: updatedFilterValue[key] });
      delete updatedFilterValue[key];

      // Set the updated object in the new state
      setValue(updatedFilterValue);
    }
  };

  return (
    <div className="mt-3 mb-3 p-2 pl-3 bg-[#F3F9FF] flex flex-row  text-center">
      <h3 className="text-[#343434] font-semibold">Applied Filters : </h3>
      <div className="flex flex-row items-center justify-center">
        <div className="flex-wrap gap-1 mr-2 ml-2">
          <div className="flex flex-row text-center">
            {Object.keys(filterValue).map((key, i) => {
              const value = filterValue[key];
              if (typeof value === 'string') {
                return (
                  <div
                    className="flex flex-row justify-between gap-2 items-center capitalize px-2     rounded-full text-[14px] font-medium bg-primary text-[#FFFFFF] whitespace-nowrap"
                    key={i}
                  >
                    {`${
                      key == 'searchQuery' ? 'Search' : key.replace('_', ' ')
                    } : ${value}`}
                    <Button
                      variant="ghost"
                      className="h-4 w-4 p-2 rounded-full border border-gray-100"
                      onClick={() => handleDeleteFilter(key)}
                    >
                      <span className="sr-only">Go to previous page</span>
                      <i className="fas fa-times "></i>
                    </Button>
                    {/* <button
                      className="flex flex-shrink-0 ml-[5px]  h-[14px] w-[14px] rounded-full items-center justify-center bg-white text-[#000000] hover:bg-pink-200 hover:text-black-500 focus:outline-none focus:bg-pink-800 focus:text-white"
                      onClick={() => handleDeleteFilter(key)}
                    >
                      <i className="fas fa-times text-[9px]"></i>
                    </button> */}
                  </div>
                );
              } else if (typeof value === 'boolean') {
                return (
                  <div
                    className="flex flex-row justify-evenly items-center m-0.5 pl-2 pr-0.5 rounded-full text-[14px] font-medium bg-[#BF1065] text-[#FFFFFF] whitespace-nowrap"
                    key={i}
                  >
                    {`${key === 'is_listed' ? 'Listed' : 'Minted'}`}
                    <button
                      className="flex flex-shrink-0 ml-[5px]  h-[14px] w-[14px] rounded-full items-center justify-center bg-white text-[#000000] hover:bg-pink-200 hover:text-black-500 focus:outline-none focus:bg-pink-800 focus:text-white"
                      onClick={() => handleDeleteFilter(key)}
                    >
                      <i className="fas fa-times text-[9px]"></i>
                    </button>
                  </div>
                );
              }
              return null; // Skip rendering for other types of values
            })}
          </div>

          {/* {filterValue !== null && (
            <div className="flex flex-row justify-evenly items-center m-0.5 pl-2 pr-0.5 rounded-full text-[14px] font-medium bg-[#BF1065] text-[#FFFFFF] whitespace-nowrap">
              {filterValue.sell_type}
              <button
                className="flex flex-shrink-0 ml-[5px]  h-[14px] w-[14px] rounded-full items-center justify-center bg-white text-[#000000] hover:bg-pink-200 hover:text-black-500 focus:outline-none focus:bg-pink-800 focus:text-white"
                //   onClick={() => console.log('setting val : ', filterValue)}
              >
                <i className="fas fa-times text-[9px]"></i>
              </button>
            </div>
          )} */}
        </div>
      </div>
      <div className="flex felx-row justify-center text-center">
        <button
          type="button"
          className="hover:text-[#3182CE] text-[#343434] hover:underline font-medium"
          onClick={handleClearData}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
