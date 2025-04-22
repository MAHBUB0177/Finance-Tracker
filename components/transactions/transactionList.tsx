"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../common/paginate";
import {
  DeleteTransactionById,
  GetAllTransaction,
  GetTransactionById,
  GetTransactionEditById,
} from "@/service/allApi";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import FilterTransaction from "./filterTransaction";
import { Button, Form, message } from "antd";
import CommonModal from "../common/commonModal";
import EditTransaction from "./editTransaction";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string; // Or use `Date` if you're converting it to a Date object
};

const TransactionList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [isLoading, setIsloading] = useState(false);
  const [isSearch, setIssearch] = useState(false);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [editId, setEditId] = useState<string | number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //filter list state 
  const [filterData, setFilterdata] = useState({
    category: "",
     date:""
  });

  //edit item state
  const [editData, seteditData] = useState({
    category: "",
    amount: "",
  });
  //pagination change page 
  const _handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1; // Adjust to 1-based index
    setCurrentPageNumber(selectedPage);
  };
  //close modal
  const _handleCancel = () => {
    setIsModalOpen(false); // Close the edit modal
  };

  const getallTransaction = async (currentPage: number, payload: any) => {
    try {
    setIsloading(true);
      const res = await GetAllTransaction(currentPage, pageSize, payload);
      if (res?.data) {
        setTransactionsList(res?.data?.data);
        setPageCount(res?.data?.pages);
        setIsloading(false);
        
       
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setIsloading(false);
    } 
   
  };



  useEffect(() => {
    getallTransaction(currentPageNumber, filterData);
  }, [currentPageNumber, isSearch]);

  
  const handleEdit = async (id: any) => {
    setEditId(id);
    const result = await GetTransactionById(id);
    if (result?.data) {
      setIsModalOpen(true);
      seteditData({
        category: result?.data?.category,
        amount: result?.data?.amount,
      });

      setTimeout(() => {
        form.setFieldsValue({
          category: result?.data?.category,
          amount: result?.data?.amount,
        });
      }, 0);
     
    } else {
      messageApi.open({
        type: "error",
        content: "Please try again!",
      });
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      const res = await DeleteTransactionById(id);
      getallTransaction(currentPageNumber, filterData);
      messageApi.open({
        type: "success",
        content: "Transaction deleted successfully!",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to delete transaction",
      });
    } finally {
    }
  };

  // Handle form submission
  const onFinish = async () => {
    try {
      if (!editId) {
        messageApi.open({
          type: "error",
          content: "No transaction selected to update.",
        });
        return;
      }
      const updatedData = {
        ...editData,
        amount: Number(editData.amount),
      };
  
      if (isNaN(updatedData.amount)) {
        messageApi.open({
          type: "error",
          content: "Amount must be a valid number.",
        });
        return;
      }
      const res = await GetTransactionEditById(editId, updatedData);
      if(res.status == 200){
        messageApi.open({
          type: "success",
          content: "Successfully updated",
        });
        _handleCancel();
        getallTransaction(currentPageNumber, filterData);

      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Something went wrong!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="bg-white p-4 rounded-lg shadow-md ">
        <>
          <div className="pt-4 pb-4">
            <FilterTransaction
              setIssearch={setIssearch}
              setFilterdata={setFilterdata}
              filterData={filterData}
              setCurrentPageNumber={setCurrentPageNumber}
            />
          </div>
          <div className="overflow-x-auto">
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
      {isLoading ? (
        <tr>
          <td colSpan={5} className="text-center py-4 text-gray-500">
            Loading...
          </td>
        </tr>
      ) : transactionsList.length > 0 ? (
        transactionsList.map((item, i) => (
          <tr key={i}>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              {item?.date}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              {item?.description}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
              {item?.category}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              {item?.amount}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              <div className="flex items-center gap-4">
                <button onClick={() => handleEdit(item?.id)}>
                  <BiEdit className="h-[20px] w-[20px] text-green-600 cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(item?.id)}>
                  <MdDelete className="h-[20px] w-[20px] text-red-500 cursor-pointer" />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center py-8 text-gray-500">
            No data found
          </td>
        </tr>
      )}
    </tbody>
              </table>
            </>
          </div>

         {transactionsList.length > 0 &&  <div className="flex justify-end">
            <Pagination
            key={currentPageNumber}
              pageCount={pageCount}
              forcePage={currentPageNumber - 1}
              handlePageClick={_handlePageClick}
            />
          </div>}

          <div>
            <CommonModal
              open={isModalOpen}
              title={`EDIT`}
              onCancel={_handleCancel}
              width={"1000px"}
            >
              <Form form={form} onFinish={onFinish}>
                <div>
                  <EditTransaction
                    seteditData={seteditData}
                    editData={editData}
                    setIsloading={setIsloading}
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <div className="mr-1" onClick={() => _handleCancel()}>
                    <Button type="primary" danger>
                      Cancel
                    </Button>
                  </div>
                  <div className="mr-1">
                    <Button htmlType="submit" type="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </CommonModal>
          </div>
        </>
      </div>
    </>
  );
};

export default TransactionList;
