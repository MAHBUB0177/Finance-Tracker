import { Form, Input } from 'antd';
import React from 'react';

// Define the types for props
interface FilterTransactionProps {
    setIssearch: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterdata: React.Dispatch<React.SetStateAction<{
        category: string;
    }>>;
    filterData: {
        category: string;
    };
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  }

const FilterTransaction: React.FC<FilterTransactionProps> = ({ setIssearch, setFilterdata,filterData ,setCurrentPageNumber}) => {
  
  // Handle input changes and update filterData
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setFilterdata((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };



  // Handle the Clear button click
  const handleClear = () => {
    setFilterdata({
        category: '',
    });
    setIssearch(false); // Reset search state to false
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Form.Item
            name="category"
            rules={[
              {
                required: false,
                message: "Please input your category",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="category"
              value={filterData.category}
              onChange={(e) => handleInputChange(e, 'category')}
            />
          </Form.Item>
        </div>

       

        {/* <div>
          <Form.Item
            name="Rent"
            rules={[
              {
                required: false,
                message: "Please input your Rent",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Rent"
              value={filterData.Rent}
              onChange={(e) => handleInputChange(e, 'Rent')}
            />
          </Form.Item>
        </div> */}

        <div className="flex justify-start gap-4">
          <button
            className="bg-orange-400 text-white rounded-md px-2 h-[30px] w-auto"
            onClick={() => {
                setIssearch(true);
                setCurrentPageNumber(1);
              }}
          >
            Apply
          </button>

          <button
            className="bg-red-400 text-white rounded-md px-2 h-[30px] w-auto"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterTransaction;
