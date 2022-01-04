// import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
// import flashFill from '@iconify/icons-eva/flash-fill';
// // next
// import NextLink from 'next/link';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Stack, Button, Container, Typography } from '@mui/material';
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths'; 
//
import {
  varFadeIn,
  // varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(20),
      margin: 'unset',
      textAlign: 'left',
    },
    [theme.breakpoints.down('md')]:{
      paddingBottom: 0,
      paddingTop: theme.spacing(15)
    }
  })
);

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100vh',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  height: '100vh',
  width: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '0px',
    top: '0px',
    width: '100%',
    height: '100vh',
  },
  [theme.breakpoints.down('md')]:{
    height: '100vh'
  }
}));

const Footer = styled('div')(({theme})=>({
  [theme.breakpoints.down('md')]:{
    paddingTop: 60
  }
}))

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial='initial' animate='animate' variants={varWrapEnter}>
        {/* <HeroImgStyle
          alt='hero'
          src='../img/BABAH.png'
          sx={{zIndex: 1000}}
          
        /> */}
        <HeroImgStyle
          alt='hero'
          src='../img/quran.jpg'
          sx={{right:'0 !important', objectFit:'cover'}}         
        />
        <HeroOverlayStyle
          alt='overlay'
          src='/static/overlay.svg'
          variants={varFadeIn}
        />


        <Container maxWidth='lg'>
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              
              <Typography variant='h2' sx={{ color: 'common.white' }}>
                MEWUJUDKAN GENERASI CERDAS QURANI, YANG KREATIF, MANDIRI DAN BERWAWASAN
              </Typography>
              <Typography
                
                variant='h2'
                sx={{ color: 'primary.main', lineHeight:'0.50', fontSize: '4rem !important' }}
              >
                &nbsp;<br/>GLOBAL
              </Typography>
            </motion.div>

            <Footer>

              <motion.div variants={varFadeInRight} >
                <Typography sx={{ color: 'common.white' }}>
                  Jl. Cikampak Segog km. 9, Desa Cibening, Kec. Pamijahan. Bogor
                </Typography>
              </motion.div>

              <Stack
                marginTop='0px !important'
                height='60px !important'
                direction='row'
                spacing={2}
                justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start'}}
              >
                  <motion.img 
                    width='40px !important'
                    height='auto'
                    variants={varFadeInRight}
                    src='/icon/youtube.svg'
                  />
                  <motion.img
                    width='30px !important'
                    height='auto'
                    variants={varFadeInRight}
                    src='/icon/Instagram.svg'
                  />
                  <motion.img
                    width='30px !important'
                    height='auto'
                    variants={varFadeInRight}
                    src='/icon/facebook.svg'
                  />
              </Stack>
            </Footer>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
