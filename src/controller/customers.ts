export async function getCustomers (req, res) {
  // Retrieve a list of customers from the database
  const customers = [
    { id: 1, name: "John Doe", email: "pyaephyokhant2020dc@gmail.com" },
    { id: 2, name: "Jane Smith", email: "test@gmail.com" },
  ];
  return res.status(200).json(customers);
}