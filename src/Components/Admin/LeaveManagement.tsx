import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import moment from "moment";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    try {
      const storedLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
      setLeaveRequests(storedLeaves);
      console.log(storedLeaves);
    } catch (error) {
      console.error("Error parsing leave data from local storage:", error);
    }
  }, []);

  const handleAction = (record) => {
    setSelectedLeave(record);
    setModalVisible(true);
  };

  const handleApprove = () => {
    updateLeaveStatus("approved");
  };

  const handleDecline = () => {
    updateLeaveStatus("declined");
  };

  const updateLeaveStatus = (status) => {
    const updatedLeaves = leaveRequests.map((leave) =>
      leave.leaveId === selectedLeave.leaveId ? { ...leave, status } : leave
    );
    setLeaveRequests(updatedLeaves);
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));
    setModalVisible(false);
    message.success(`Leave request ${status} successfully!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="flex justify-center text-2xl "> Leave Requests</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Leave ID</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(leaveRequests) &&
              leaveRequests.map((leave) => (
                <TableRow key={leave.leaveId}>
                  <TableCell>{leave.leaveId}</TableCell>
                  <TableCell>{leave.username}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{moment(leave.startDate).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{moment(leave.endDate).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>
                    <Button type="primary" ghost onClick={() => handleAction(leave)}>
                      View / Approve / Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        title={`Leave Request - ${selectedLeave?.leaveId}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="approve" type="primary" ghost onClick={handleApprove}>
            Approve
          </Button>,
          <Button key="decline" danger onClick={handleDecline}>
            Decline
          </Button>,
        ]}
      >
        {selectedLeave && (
          <div>
            <p>Employee: {selectedLeave.username}</p>
            <p>Type: {selectedLeave.type}</p>
            <p>Start Date: {moment(selectedLeave.startDate).format("YYYY-MM-DD")}</p>
            <p>End Date: {moment(selectedLeave.endDate).format("YYYY-MM-DD")}</p>
            <p>Reason:{selectedLeave.reason}</p>
            <p>Status: {selectedLeave.status}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveManagement;
