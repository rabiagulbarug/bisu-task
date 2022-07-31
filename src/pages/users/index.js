import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const columns = [
  {id: 'firstName', label: 'Kullanıcı Adı', minWidth: 170},
  {id: 'lastName', label: 'Kullanıcı Soyadı', minWidth: 170},
  {id: 'email', label: 'Kullanıcı E-Posta', minWidth: 170},
  {id: 'date', label: 'Kayıt Tarihi', minWidth: 100, align: 'right'},
  {
    id: 'role', label: 'Rolü', minWidth: 170, type: 'select', options: [
      {label: 'Hepsi', key: 'all'},
      {label: 'Admin', key: 'admin'},
      {label: 'Customer Support', key: 'support'},
      {label: 'Müşteri', key: 'customer'},
    ]
  },
]

const localizeRole = (role) => {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'support':
      return 'Customer Support';
    case 'customer':
      return 'Müşteri';
    default:
      return 'Bilinmiyor';
  }
}

const Users = () => {
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function handle() {
      const data = await fetch(`/api/user?role=${filter}`).then(res => res.json()).then(res => res.data);
      setUsers(data.map(user => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          date: user.registeredAt,
          role: localizeRole(user.role),
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
            {users.map(row => {
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


export default Users;
