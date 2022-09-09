// ** React Imports
import {useCallback, useEffect, useReducer, useState} from 'react'

// ** Next Imports
import Link from 'next/link'
import {useRouter} from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import {styled, useTheme} from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import {useAuth} from "src/hooks/use-auth";

// ** Styled Components
const Card = styled(MuiCard)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: '28rem'}
}))

const LinkStyled = styled('a')(({theme}) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({theme}) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const StyledLogo = styled('img')({
  maxWidth: '100%',
  padding: '6px',
  height: 'auto'
});

const LoginPage = () => {
  const [values, setValue] = useReducer((state, action) => {
    switch (action.type) {
      case 'email':
        return {...state, email: action.payload};
      case 'password':
        return {...state, password: action.payload};
      default:
        return state;
    }
  }, {email: 'rabiabrg7@gmail.com', password: 'rabia123'});

  const {login, user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const {email, password} = values;
    login(email, password);
  }, [values]);

  return (
    <Box className='content-center'>
      <Card sx={{zIndex: 1}}>
        <CardContent sx={{padding: theme => `${theme.spacing(12, 9, 7)} !important`}}>
          <Box sx={{mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <StyledLogo src={"/images/logos/bisu_blue.png"} alt={"BiSU Dashboard Test"}/>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField autoFocus defaultValue={values.email} fullWidth id='email' label='Email' autoComplete='off' sx={{marginBottom: 4}}
                       onChange={e => setValue({type: 'email', payload: e.target.value})}/>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={e => setValue({type: 'password', payload: e.target.value})}
                type='password'
              />
            </FormControl>
            <Button
              fullWidth
              size='large'
              variant='contained'
              type='submit'
              style={{marginTop: '12px'}}
              sx={{marginBottom: 7}}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1/>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
