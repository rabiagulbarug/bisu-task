// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import {AccountGroup, Basket} from "mdi-material-ui";
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import {useAuth} from "src/hooks/use-auth";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Dashboard = () => {
  const {user} = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalAmount: 0, // toplam ciro
    totalUsers: 0, // toplam kullanıcı
    totalOrders: 0, // toplam sipariş
    newOrders: 0, // yeni sipariş
    enRouteOrders: 0, // yolda sipariş
    completedOrders: 0, // bitmiş sipariş
  });

  useEffect(() => {
    async function handle() {
      const data = await fetch('/api/stats').then(res => res.json()).then(res => res.data);
      setStats(data);
      console.log({data});
    }

    handle();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  // TODO: Toplam Ciro
  // TODO: Toplam Kullanıcı
  // TODO: Toplam Sipariş
  // TODO: Yeni Sipariş
  // TODO: Yolda Sipariş
  // TODO: Tamamlanmış Sipariş

  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <CardStatisticsVerticalComponent
            stats={new Intl.NumberFormat('tr', {style: 'currency', currency: 'TRY'}).format(stats.totalAmount)}
            icon={<Poll/>}
            color='success'
            title='Toplam Ciro'
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardStatisticsVerticalComponent
            stats={new Intl.NumberFormat('tr').format(stats.totalUsers)}
            icon={<AccountGroup/>}
            color='primary'
            title='Toplam Kullanıcı'
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardStatisticsVerticalComponent
            stats={new Intl.NumberFormat('tr').format(stats.totalOrders)}
            icon={<Basket/>}
            color='primary'
            title='Toplam Sipariş'
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardStatisticsVerticalComponent
            stats={new Intl.NumberFormat('tr').format(stats.newOrders)}
            icon={<Basket/>}
            color='primary'
            title='Yeni Sipariş'
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardStatisticsVerticalComponent
            stats={new Intl.NumberFormat('tr').format(stats.enRouteOrders)}
            icon={<Basket/>}
            color='warning'
            title='Yolda Olan Sipariş'
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardStatisticsVerticalComponent
            stats={new Intl.NumberFormat('tr').format(stats.completedOrders)}
            icon={<Basket/>}
            color='success'
            title='Tamamlanmış Sipariş'
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
