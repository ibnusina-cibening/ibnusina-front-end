import PropTypes from 'prop-types';
// import { Link as ScrollLink } from 'react-scroll';
// next
// import { useRouter } from 'next/router';
// material
// import { Box, Link, Container, Typography } from '@mui/material';
// components
// import Logo from './logo';
//
import MainNavbar from './MainNavbar';
// import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({ children }) {
  // const { pathname } = useRouter();
  const isHome = '/';

  return (
    <>
      <MainNavbar />
      <div>{children}</div>

      {!isHome ? (
        'ini adalah footer'
      ) : 'hello'
      // (
      //   <Box
      //     sx={{
      //       py: 5,
      //       textAlign: 'center',
      //       position: 'relative',
      //       bgcolor: 'background.default',
      //     }}
      //   >
      //     <Container maxWidth='lg'>
      //       <Typography variant='caption' component='p'>
      //         © All rights reserved
      //         <br /> made by &nbsp;
        
      //       </Typography>
      //     </Container>
      //   </Box>
      // )
    }
    </>
  );
}
