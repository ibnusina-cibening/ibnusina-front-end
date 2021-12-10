// layouts
import MainLayout from '../components/main';
// material
import { styled } from '@mui/material/styles';
// components
import Link from '../src/Link';
import Page from '../components/page';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// ----------------------------------------------------------------------

// const RootStyle = styled(Page)({
//   height: '100%',
// });

// const ContentStyle = styled('div')(({ theme }) => ({
//   overflow: 'hidden',
//   position: 'relative',
//   backgroundColor: theme.palette.background.default,
// }));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    
    // <MainLayout>
    //   <RootStyle
    //     title='The starting point for your next project | Minimal-UI'
    //     id='move_top'
    //   >

    //     <ContentStyle>

    //     </ContentStyle>
    //   </RootStyle>
    // </MainLayout>
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        {/* <ProTip /> */}
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
