import { Button, ConfigProviderProps, DatePicker, DatePickerProps, Form, Input } from "antd";
import React, { useState } from "react";
import dayjs from 'dayjs';

// Define the types for props
interface FilterTransactionProps {
  setIssearch: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterdata: React.Dispatch<
    React.SetStateAction<{
      category: string;
      date: string; // change to string
    }>
  >;
  filterData: {
    category: string;
    date: string; // change to string
  };
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  
}

const FilterTransaction: React.FC<FilterTransactionProps> = ({
  setIssearch,
  setFilterdata,
  filterData,
  setCurrentPageNumber,
}) => {
  type SizeType = ConfigProviderProps["componentSize"];
  const [size, setSize] = useState<SizeType>("large");
  const [form] = Form.useForm();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value = e.target.value.trim();
    // If the field is 'category', convert the input to lowercase
    if (field === "category") {
      value = value.toLowerCase();
    }
    setFilterdata((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onChange: DatePickerProps['onChange'] = ( dateString) => {  
    setFilterdata((prevData) => ({
      ...prevData,
      date: dateString ? dayjs(dateString).format('YYYY-MM-DD') : '',
    }));
  };

  // Handle the Clear button click
  const handleClear = () => {
    setFilterdata((prevData) => ({
      ...prevData,
      category: "",
      date:""
    }));
    form.resetFields(["category","date"]); // reset form input
    setCurrentPageNumber(1)
    setIssearch((old) => !old);
  };

  return (
    <div>
      <Form form={form}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Form.Item
              name="category"
              rules={[
                {
                  required: false,
                  message: "Please input your Category",
                },
              ]}
            >
              <Input
                type="text"
                style={{ height: "40px" }}
                placeholder="Category"
                value={filterData.category}
                onChange={(e) => handleInputChange(e, "category")}
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="date"
              rules={[{ required: false, message: "Please input your Date" }]}
            >
              <DatePicker
                format="MM/DD/YYYY"
                style={{ width: "100%", height: "40px" }}
                onChange={onChange}
              />
            </Form.Item>
          </div>

          <div className="flex justify-start gap-4">
            <Button
              type="primary"
              size={size}
              htmlType="submit"
              onClick={() => {
                setIssearch((old) => !old);
                setCurrentPageNumber(1);
              }}
            >
              Apply
            </Button>

            <Button type="primary" size={size} danger onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterTransaction;
