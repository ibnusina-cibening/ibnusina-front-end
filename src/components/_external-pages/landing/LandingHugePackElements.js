// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, Card } from '@mui/material';
//
import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
import { useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';


// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(24, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
          theme.palette.grey[300]
        } 100%)`
      : 'none',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

// const ScreenStyle = styled(MotionInView)(({ theme }) => ({
//   paddingRight: 2,
//   paddingBottom: 1,
//   maxWidth: 160,
//   borderRadius: 8,
//   backgroundColor:
//     theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
//   [theme.breakpoints.up('sm')]: {
//     maxWidth: 320,
//     paddingRight: 4,
//     borderRadius: 12,
//   },
//   '& img': {
//     borderRadius: 8,
//     [theme.breakpoints.up('sm')]: {
//       borderRadius: 12,
//     },
//   },
// }));

const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '-50%', translateY: 40, opacity: 1 },
};
const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 },
};
const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '50%', translateY: -40, opacity: 1 },
};

const YoutubeEmbed = dynamic(()=>import('../../YoutubePlay'))




// ----------------------------------------------------------------------

export default function LandingHugePackElements() {
  const {ref, inView} = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isLight = theme.palette.mode === 'light';
  // const isRTL = theme.direction === 'rtl';

  // const screenLeftAnimate = variantScreenLeft;
  // const screenCenterAnimate = variantScreenCenter;
  // const screenRightAnimate = variantScreenRight;

  return (
    <RootStyle>
      <Container maxWidth='lg'>
        <Grid container spacing={5} justifyContent='center'>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle sx={{marginBottom: isMobile ? '20px' : '100px'}}>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component='p'
                  variant='overline'
                  sx={{ mb: 2, color: 'text.secondary' }}
                >
                  Pendidikan berkarakter
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                Pembentukan karakter sebagai inti pendidikan pesantren
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  Pendidikan Pondok Pesantren Ibnu Sina berkomitmen pada pembentukan karakter para santri, sebagai kader-kader masa depan dengan akhlak luhur (akhlakul karimah), di samping bekal keahlian yang cukup.
                </Typography>
              </MotionInView>

              {/* <MotionInView variants={varFadeInUp}>
                <Button size='large' color='inherit' variant='outlined'>
                  View All Components
                </Button>
              </MotionInView> */}
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={8} dir='ltr' sx={{paddingTop: isMobile ? '5px !important' : '100px'}}>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <MotionInView variants={varFadeInLeft}>
                <Box component='img' src='/img/sulton.png'></Box>
              </MotionInView>
              {/* {[...Array(3)].map((_, index) => (
                <ScreenStyle
                  key={index}
                  threshold={0.72}
                  variants={{
                    ...(index === 0 && screenLeftAnimate),
                    ...(index === 1 && screenCenterAnimate),
                    ...(index === 2 && screenRightAnimate),
                  }}
                  transition={{ duration: 0.72, ease: 'easeOut' }}
                  sx={{
                    boxShadow: `${isRTL ? -80 : 80}px -40px 80px ${alpha(
                      isLight
                        ? theme.palette.grey[600]
                        : theme.palette.common.black,
                      0.48
                    )}`,
                    ...(index === 0 && {
                      zIndex: 3,
                      position: 'absolute',
                    }),
                    ...(index === 1 && { zIndex: 2 }),
                    ...(index === 2 && {
                      zIndex: 1,
                      position: 'absolute',
                      boxShadow: 'none',
                    }),
                  }}
                >
                  <img
                    alt={`screen ${index + 1}`}
                    src={`/static/home/screen_${isLight ? 'light' : 'dark'}_${
                      index + 1
                    }.png`}
                  />
                </ScreenStyle>
              ))} */}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='lg' sx={{ marginTop:'100px'}}>
        <Grid container spacing={5} justifyContent='center'>
          <Grid item xs={12} md={8} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <MotionInView variants={varFadeInLeft}>
                <Box component='img' src='/img/pendampingan.png'></Box>
              </MotionInView>
              
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component='p'
                  variant='overline'
                  sx={{ mb: 2, color: 'text.secondary' }}
                >
                  Pengasuhan
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                  Pendampingan dan pengawasan 24 jam seminggu
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  Para santri ponpes Ibnu Sina senantiasa mendapat bimbingan dan pengawasan ustadz/ustadzah sehingga dapat semaksimal mungkin terproteksi dengan baik dan berhasil melewati proses pendidikan hingga hari kelulusan
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
      </Container>

      
      <Container maxWidth='lg' sx={{ marginTop: isMobile ? '20px' : '200px', justifyContent:'center'}}>
        <MotionInView variants={varFadeInUp}>
          <Grid
              item
              lg={12}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
            <Grid item lg={4}>
              <Card sx={{ padding:'40px' }}>
                <Typography variant='h3' sx={{ paddingBottom:'20px'}}>Info Pendaftaran 2021/2022</Typography>
                <Typography paddingBottom='40px'>Pendaftaran gelombang satu dibuka mulai Desember 2020 s.d. Februari 2021. Untuk gelombang dua, Maret s.d. April 2021; Gelombang tiga, Mei s.d. Juni 2021. Update terus informasi dari kami dengan mengikuti media-media resmi Pondok Pesantren Ibnu Sina.</Typography>
                <Button variant='contained'>Test</Button>
              </Card>
            </Grid>
          </Grid>
        </MotionInView>
      </Container>


      <Container maxWidth='lg' sx={{ marginTop: isMobile ? '20px' : '200px', justifyContent:'center'}}>
        
          <Grid
            item
            lg={12}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <MotionInView variants={varFadeInLeft}>
              <Typography
                component='p'
                variant='overline'
                sx={{ mb: 2, color: 'text.secondary' }}
              >
                
                Karya Kreatif Santri
              </Typography>

              

              
            </MotionInView>

            



          </Grid>
            <Typography variant='h3' sx={{ paddingBottom:'20px', textAlign:'center'}}>Pesantren Ibnu Sina Cibening</Typography>
          <div ref={ref}>
            {
              inView && 
              <MotionInView variants={varFadeInLeft}>
                <YoutubeEmbed embedId='exCjidLxX3o'/>
              </MotionInView>
            }
          </div>


        
      </Container>
      
    </RootStyle>
  );
}
