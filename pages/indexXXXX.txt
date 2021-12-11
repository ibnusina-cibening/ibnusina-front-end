// layouts
import MainLayout from '../components/main';
// material
import { styled } from '@mui/material/styles';
// components
import React, { FC } from 'react';
// import Link from '../src/link';
import Page from '../components/page';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { HtmlProps } from 'next/dist/shared/lib/utils';
import { Refresh } from '@mui/icons-material';


// ----------------------------------------------------------------------

const RootStyle: FC<any> = styled(Page)({
  height: '100%',
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  // const ref = React.createRef<HtmlProps>();
  return (

    <MainLayout>
      <RootStyle
        title='Beranda'
        id='move_top'
      >
        <ContentStyle>
         Aku adalan landing page 
         Aku adalan landing page 
         Aku adalan landing page 
         Aku adalan landing page 
         Aku adalan landing page 
         Aku adalan landing page 
         Aku adalan landing page 
        </ContentStyle>
      </RootStyle>
    </MainLayout>
    // <Container maxWidth="sm">
    //   <Box sx={{ my: 4 }}>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Next.js example
    //     </Typography>

    // {/* <Link type = {'anchor'} ref = {ref} href={"/about" } color="secondary">
    //   Go to the about page
    // </Link> */}
    // {/* <Link type = {'a'} ref={ref}>Click me!</Link>; */}
    // {/* <ProTip /> */}
    // {/* <Copyright /> */}
    //   </Box>
    // </Container>
  );
}
