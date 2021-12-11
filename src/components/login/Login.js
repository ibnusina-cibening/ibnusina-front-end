import { capitalCase } from 'change-case';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography, Button } from '@mui/material';
// routes
// import { PATH_AUTH } from '../../routes/paths';
// hooks
// import {useAuth} from 'src/db/auth';
// layouts
// import AuthLayout from 'src/layouts/dashboard/AuthLayout';
// components
import Page from 'src/components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from 'src/components/login';
import AuthLayout from 'src/layouts/dashboard/AuthLayout';
// import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
    const method = 'jwt'

  return (
    <RootStyle title="Login | Ibnu Sina">
      <AuthLayout>
        Tidak punya akun? &nbsp;
        <Link underline="none" variant="subtitle2" href="/dashboard">
          daftar
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Selamat Datang
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Masuk Ibnusina dashboard
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Masukan datamu dibawah</Typography>
            </Box>

            <Tooltip title={capitalCase(method)}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip>
          </Stack>

          {method === 'firebase' && <AuthFirebaseSocials />}

          <Alert severity="info" sx={{ mb: 3 }}>
            gunakan user : <strong>joko</strong> / password :<strong>&nbsp;1234</strong>
          </Alert>

          {method !== 'auth0' ? (
            <LoginForm />
          ) : (
            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLoginAuth0}>
              Login
            </Button>
          )}

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Tidak punya akun?&nbsp;
              <Link variant="subtitle2" href="/dashboard">
                Daftar
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}