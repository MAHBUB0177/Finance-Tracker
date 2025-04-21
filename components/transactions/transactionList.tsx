"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../common/paginate";
import { GetAllTransaction, GetTransactionById, GetTransactionEditById } from "@/service/allApi";
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
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [isLoading, setIsloading] = useState(false);
  const [isSearch, setIssearch] = useState(false);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

  const [filterData, setFilterdata] = useState({
    category: "",
    amount: "",
  });


  const [editData, seteditData] = useState({
    category: "",
    amount: "",
  });
  const _handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1; // Adjust to 1-based index
    setCurrentPageNumber(selectedPage);
  };

  const getallTransaction = async (currentPage: number, payload: any) => {
    try {
      setIsloading(true);
      const res = await GetAllTransaction(currentPage, pageSize, payload);
      if (res?.data) {
        setTransactionsList(res?.data?.data);
        setPageCount(res?.data?.pages);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getallTransaction(currentPageNumber, filterData);
  }, [currentPageNumber, isSearch]);

  const [editId, setEditId] = useState<string | number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEdit = async(id:any) => {
    setEditId(id)
    const result = await GetTransactionById(id);
    if (result?.data) {
        setIsModalOpen(true)
        seteditData({
        category: result?.data?.category,
        amount: result?.data?.amount,
      });
      form.setFieldsValue({
        category: result?.data?.category,
        amount: result?.data?.amount,
      });
    } else {
      message.error("Please try again!");
    }
  };

  const _handleCancel = () => {
    setIsModalOpen(false); // Close the edit modal
  };

      // Handle form submission
      const onFinish = async () => {
        try {
          if (!editId) {
            message.error("No transaction selected to update.");
            return;
          }
      
          const res = await GetTransactionEditById(editId, editData);
        
          message.success('Successfully updated');
          getallTransaction(1, filterData);
          _handleCancel(); // optional: reset modal/form
        } catch (error) {
          message.error('Something went wrong!');
        }
      };
      
  return (
    <div className="bg-white p-4 rounded-lg shadow-md ">
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
              {transactionsList.map((item, i) => {
                return (
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
                      <div className="flex  items-center gap-4">
                      <button onClick={() => handleEdit(item?.id)}>
                        <BiEdit className="h-[20px] w-[20px] text-green-600 cursor-pointer" />
                        </button>

                        <button>
                          <MdDelete className="h-[20px] w-[20px] text-red-500 cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      </div>

      <div className="flex justify-end">
        <Pagination
          pageCount={pageCount}
          forcePage={currentPageNumber - 1}
          handlePageClick={_handlePageClick}
        />
      </div>

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
              <div
                className="mr-1"
                onClick={() => _handleCancel()}
              >
                <Button type="primary" danger>
                  Cancel
                </Button>
              </div>
              <div  className="mr-1">
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </CommonModal>
      </div>
    </div>
  );
};

export default TransactionList;
