import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const columns = [
  {id: 'customer', label: 'Müşteri Adı', minWidth: 170},
  {
    id: 'status', label: 'Sipariş Durumu', minWidth: 170, type: 'select', options: [
      {label: 'Hepsi', key: 'all'},
      {label: 'Yeni', key: 'pending'},
      {label: 'Yolda', key: 'enRoute'},
      {label: 'Tamamlanmış', key: 'completed'},
    ]
  },
  {id: 'date', label: 'Sipariş Tarihi', minWidth: 100, align: 'right'},
  {id: 'amount', label: 'Sipariş Tutarı', minWidth: 100, align: 'right'},
  {id: 'details', label: 'Detaylar', minWidth: 100, align: 'right'},
]

const OrderDetailButton = ({orderId}) => {
  const router = useRouter();

  return (
    <Button variant="outlined" color="primary" onClick={() => router.push(`/orders/${orderId}`)}>
      Detaylar
    </Button>
  )
};

const localizeStatus = (status) => {
  switch (status) {
    case 'completed':
      return 'Tamamlanmış';
    case 'enRoute':
      return 'Yolda';
    case 'pending':
      return 'Yeni';
    default:
      return 'Bilinmiyor';
  }
}

const Orders = () => {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function handle() {
      const data = await fetch(`/api/order?status=${filter}`).then(res => res.json()).then(res => res.data);
      setOrders(data.map(order => {
        return {
          id: order.id,
          customer: order.customer.firstName + ' ' + order.customer.lastName,
          status: localizeStatus(order.status),
          date: order.orderedAt,
          amount: new Intl.NumberFormat('tr', {style: 'currency', currency: 'try'}).format(order.totalPrice),
          details: <OrderDetailButton orderId={order.id}/>,
        }
      }));
    }

    handle();
  }, [filter]);

  return (
    <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{maxHeight: 440}}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                column?.type !== 'select' ?
                  <TableCell key={column.id} align={column.align} sx={{minWidth: column.minWidth}}>
                    {column.label}
                  </TableCell> : <TableCell key={column.id} align={column.align} sx={{minWidth: column.minWidth}}>
                    <FormControl fullWidth>
                      <InputLabel id="filter-label">{column.label}</InputLabel>
                      <Select
                        labelId="filter-label"
                        id="filter"
                        value={filter}
                        label={column.label}
                        onChange={e => setFilter(e.target.value)}
                      >
                        {column.options.map(option => (
                          <MenuItem key={option.key} value={option.key}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(row => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
};


export default Orders;
