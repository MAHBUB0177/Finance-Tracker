import { Form, Input } from "antd";
import React from "react";

interface FilterTransactionProps {
    seteditData: React.Dispatch<
    React.SetStateAction<{
      category: string;
      amount: string; 
    }>
  >;
  editData: {
    category: string;
    amount: string;
  };
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTransaction: React.FC<FilterTransactionProps> = ({
  setIsloading,
  seteditData,
  editData,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value.trim();
    seteditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
              value={editData.category}
              onChange={(e) => handleInputChange(e, "category")}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="amount"
            rules={[
              {
                required: false,
                message: "Please input your Rent",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Amount"
              value={editData?.amount}
              onChange={(e) => handleInputChange(e, "amount")}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
