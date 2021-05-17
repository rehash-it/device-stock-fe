import { Table, Space, Button } from "antd";
import { Popconfirm, message } from "antd";
import React, { useState } from "react";
import { Link, useHistory as UseHistory } from "react-router-dom";
import DeviceService from "../../services/DeviceService";
import { Redirect } from "react-router-dom";

const Device = () => {
  const [data, setData] = useState([]);
  const history = UseHistory();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "lastCheckedOutDate",
      dataIndex: "lastCheckedOutDate",
      key: "lastCheckedOutDate",
      render: (text) => <text>{text == null ? "No Checkout date" : new Date(text).toLocaleString()}</text>,
    },
    {
      title: "lastCheckedOutBy",
      key: "lastCheckedOutBy",
      dataIndex: "lastCheckedOutBy",
      render: (text) => (
        <text>{text == null ? "Not Checked out" : text.name}</text>
      ),
    },
    {
      title: "Checkout status",
      dataIndex: "isCheckedOut",
      key: "isCheckedOut",
      render: (text) => (
        <text>{text == true ? "Checked out" : "Checked in"}</text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Space size="middle">
          <Button onClick={(e) => handleCheckout(e, text._id)}>
            {text.isCheckedOut == true ? "Check in" : "Check out"}
          </Button>
          <Popconfirm
            title="Are you sure to delete this organization?"
            onConfirm={() => confirmDelete(text._id)}
            onCancel={cancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  React.useEffect(() => {
    getDevices();
  }, []);

  const confirmDelete = (id) => {
    DeviceService.remove(id).then((response) => {});
    message.success("Successfully deleted device");
    getDevices();
  };

  const handleCheckout = (e, id) => {
    var data = null;
    if (e.target.innerHTML == "Check out") {
      data = {
        isCheckedOut: true,
      };
    } else {
      data = {
        isCheckedOut: false,
      };
    }
    DeviceService.check(id, data).then((response) => {
    }).finally((response)=>{
      console.log(response);
      message.error(response);

    })
    getDevices()
  };

  const cancelDelete = (e) => {
    message.error("Device is not deleted");
  };
  const getDevices = async () => {
    await DeviceService.getAll().then((device) => {
      setData(device.data);
    });
  };

  const addNewDevice = () => {
    history.push("/addnewdevice");
  };

  return (
    <div>
      <Button onClick={addNewDevice} type="primary">
        Add New
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 240 }}
      />
    </div>
  );
};

export default Device;
