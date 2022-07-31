import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import {Box, Button, Grid, Modal, Paper} from "@mui/material";
import {Loading} from "mdi-material-ui";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

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

const columns = [
  {id: 'name', label: 'Ürün Adı', minWidth: 170},
  {id: 'quantity', label: 'Miktar', minWidth: 170, align: 'right'},
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const OrderDetail = () => {
  const router = useRouter();
  const {id} = router.query;
  const [order, setOrder] = useState(null);
  const [currentTab, setCurrentTab] = useState('order');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  useEffect(() => {
    async function handle() {
      const data = await fetch(`/api/order/${id}`).then(res => res.json()).then(res => res.data);
      setOrder(data);
    }

    handle();
  }, [id]);

  return (
    <Fragment>
      <Paper sx={{width: '100%'}}>
        <Card>
          {order ? (
            <TabContext value={currentTab}>
              <TabList onChange={handleChange}>
                <Tab value='order' label='Sipariş'/>
                <Tab value='customer' label='Müşteri'/>
                <Tab value='address' label='Adres'/>
                <Tab value='products' label='Ürünler'/>
              </TabList>
              <CardContent>
                <TabPanel value='order' sx={{p: 0}}>
                  <Grid>
                    <Grid>
                      <strong>Tarih</strong>
                    </Grid>
                    <Grid>
                      {order.orderedAt}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Sipariş Durumu</strong>
                    </Grid>
                    <Grid>
                      {localizeStatus(order.status)}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Toplam Ücret</strong>
                    </Grid>
                    <Grid>
                      {new Intl.NumberFormat('tr', {style: 'currency', currency: 'TRY'}).format(order.totalPrice)}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Müşteri Notu</strong>
                    </Grid>
                    <Grid>
                      {order.note}
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value='customer' sx={{p: 0}}>
                  <Grid>
                    <Grid>
                      <strong>Adı</strong>
                    </Grid>
                    <Grid>
                      {order.customer.firstName}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Soyadı</strong>
                    </Grid>
                    <Grid>
                      {order.customer.lastName}
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value='address' sx={{p: 0}}>
                  <Grid>
                    <Grid>
                      <strong>İl</strong>
                    </Grid>
                    <Grid>
                      {order.address.city}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>İlçe</strong>
                    </Grid>
                    <Grid>
                      {order.address.town}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Mahalle</strong>
                    </Grid>
                    <Grid>
                      {order.address.neighborhood}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Sokak</strong>
                    </Grid>
                    <Grid>
                      {order.address.street}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Bina No</strong>
                    </Grid>
                    <Grid>
                      {order.address.buildingNo}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <strong>Daire No</strong>
                    </Grid>
                    <Grid>
                      {order.address.apartmentNo}
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value='products' sx={{p: 0}}>
                  <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label='sticky table'>
                      <TableHead>
                        <TableRow>
                          {columns.map(column => (
                            column?.type !== 'select' ?
                              <TableCell key={column.id} align={column.align} sx={{minWidth: column.minWidth}}>
                                {column.label}
                              </TableCell> :
                              <TableCell key={column.id} align={column.align} sx={{minWidth: column.minWidth}}>
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
                        {order.products.map(row => {
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
                </TabPanel>
              </CardContent>
            </TabContext>
          ) : <Loading/>}
          {order && (order.status === 'pending' || order.status === 'enRoute') && (
            <CardContent>
              <Button type="button" variant="contained" color="primary" onClick={handleOpen}>
                Siparişi Tamamla
              </Button>
            </CardContent>
          )}
        </Card>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>
            <Grid>
              Sipariş tamamlama işlemi yalnızca kuryeler tarafından gerçekleştirilebilir
            </Grid>
            <Grid>
              <Button type="button" variant="outlined" color="error" onClick={handleClose}>
                Kapat
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default OrderDetail;
