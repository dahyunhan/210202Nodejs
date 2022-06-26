import React, { useEffect, useState } from "react";
import { Switch, Link } from "react-router-dom";
import { baseUrl } from "../testEnv";
import axios from "axios";
import { Button, Table, Input, InputNumber, Popconfirm, Form, Typography  } from 'antd';
import Column from "antd/lib/table/Column";

const originData = [];


function ItemList() {
  let [itemlist, setItemlist] = useState([]);

  useEffect(() => {
    getItemList()
  }, []);

  let getItemList = async () => {
    let itemlist = await axios.get(`${baseUrl}/itemList`);

    setItemlist(itemlist.data.itemlist);
  };
  // itemlist가 변수 setItemlist가 함수
  //템플릿 리터럴 걍 쉽게 나열 가능
  //괄호 안 값이 바뀌면 itemlist 값 업데이트

 
  



const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `빈 칸 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      amount: '',
      purchase_price: '',
      sales_price: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "상품명",
      dataIndex: "name",
      editable: true,
      
    },
    {
      title: "재고량",
      dataIndex: "amount",
      editable: true,
    },
    {
      title: "매입가",
      dataIndex: "purchase_price",
      editable: true,
    },
    
    {
      title: "매출가",
      dataIndex: "sales_price",
      editable: true,
    },

    {
      title: '변경',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              저장
            </Typography.Link>
            <Popconfirm title="취소하시겠습니까?" onConfirm={cancel}>
              <a>취소</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            변경
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={itemlist}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};


  return (
    <div>
      <h3>상품 목록 뷰</h3>

      <div> 
        <Table  dataSource={itemlist} columns={Column.columns}  />
      </div>
     

      
  
      <div>
        <Button
          type="primary"
          onClick={() => {
            getItemList();
          }}
        >
          상품 업데이트
        </Button>

        <Button type="primary">
          <Link to="/change">상품 목록 변경</Link>
        </Button>
      </div>
    </div>
  );
}

export default ItemList;
