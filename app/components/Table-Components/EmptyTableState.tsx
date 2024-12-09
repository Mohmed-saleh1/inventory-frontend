import React from "react";

const EmptyTableState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-sm">
      <div className="mb-2 text-lg font-semibold">No Data Available</div>
      <div className="text-center w-3/4">
        It seems there are currently no items in your inventory table. Please add some items to see them listed here.
      </div>
    </div>
  );
};

export default EmptyTableState;
