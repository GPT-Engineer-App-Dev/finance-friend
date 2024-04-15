import React, { useState } from "react";
import { Box, Heading, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer, Text } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaFilter, FaFileExport } from "react-icons/fa";


const categories = ["Groceries", "Bills", "Salary", "Entertainment", "Transportation"];

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categories[0]);
  const [editIndex, setEditIndex] = useState(-1);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const addTransaction = () => {
    if (editIndex === -1) {
      setTransactions([...transactions, { date, amount: +amount, type, category }]);
    } else {
      const newTransactions = [...transactions];
      newTransactions[editIndex] = { date, amount: +amount, type, category };
      setTransactions(newTransactions);
      setEditIndex(-1);
    }
    setDate("");
    setAmount("");
    setType("expense");
    setCategory(categories[0]);
  };

  const editTransaction = (index) => {
    const { date, amount, type, category } = transactions[index];
    setDate(date);
    setAmount(amount.toString());
    setType(type);
    setCategory(category);
    setEditIndex(index);
  };

  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
    const afterStartDate = !filterStartDate || transaction.date >= filterStartDate;
    const beforeEndDate = !filterEndDate || transaction.date <= filterEndDate;
    return matchesType && matchesCategory && afterStartDate && beforeEndDate;
  });

  const balance = filteredTransactions.reduce((total, transaction) => (transaction.type === "income" ? total + transaction.amount : total - transaction.amount), 0);

  const exportTransactions = () => {
    const data = JSON.stringify(transactions, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transactions.json";
    link.href = url;
    link.click();
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        Budget App
      </Heading>
      <Flex mb={8}>
        <Box flex={1} mr={4}>
          <Input placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} mb={2} />
          <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} mb={2} />
          <Select value={type} onChange={(e) => setType(e.target.value)} mb={2}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} mb={4}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addTransaction}>
            {editIndex === -1 ? "Add Transaction" : "Update Transaction"}
          </Button>
        </Box>
        <Box flex={1}>
          <Input placeholder="Start Date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} mb={2} />
          <Input placeholder="End Date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} mb={2} />
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} mb={2}>
            <option value="all">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>
          <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} mb={4}>
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Button
            leftIcon={<FaFilter />}
            colorScheme="green"
            onClick={() => {
              setFilterType("all");
              setFilterCategory("all");
              setFilterStartDate("");
              setFilterEndDate("");
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Flex>
      <Table variant="simple" mb={8}>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Type</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTransactions.map((transaction, index) => (
            <Tr key={index}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.category}</Td>
              <Td>
                <Button leftIcon={<FaEdit />} colorScheme="teal" size="sm" mr={2} onClick={() => editTransaction(index)}>
                  Edit
                </Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => deleteTransaction(index)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mb={4} alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          Balance: {balance}
        </Text>
        <Spacer />
        <Button leftIcon={<FaFileExport />} onClick={exportTransactions}>
          Export Transactions
        </Button>
      </Flex>
    </Box>
  );
};

export default Index;
