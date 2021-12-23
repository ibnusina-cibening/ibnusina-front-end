// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Collapse, Container, Typography, Divider, Button } from '@mui/material';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';
//
import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

//https://github.com/reduxjs/redux-toolkit.git
// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(20, 0),
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

const ScreenStyle = styled(MotionInView)(({ theme }) => ({
  paddingRight: 2,
  paddingBottom: 1,
  maxWidth: 160,
  borderRadius: 8,
  backgroundColor:
    theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  [theme.breakpoints.up('sm')]: {
    maxWidth: 320,
    paddingRight: 4,
    borderRadius: 12,
  },
  '& img': {
    borderRadius: 8,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 12,
    },
  },
}));

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

// ----------------------------------------------------------------------

export default function LandingHugePackElements() {
  const [open, setOpen] = useState({
    faq1: true,
    faq2: false,
    faq3: false
  });
  const handleClick = (e) => {
    setOpen({
      ...open,
     [e.target.id]: !open[e.target.id] 
    });
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isLight = theme.palette.mode === 'light';
  const isRTL = theme.direction === 'rtl';

  const screenLeftAnimate = variantScreenLeft;
  const screenCenterAnimate = variantScreenCenter;
  const screenRightAnimate = variantScreenRight;

  return (
    <RootStyle>
      <Container maxWidth='lg'>
        <MotionInView variants={varFadeInLeft}>
          <Box component='img' src='/img/kelas.jpg' sx={{minWidth: !isMobile ? '400px' : '90vw', height: 'auto'}}></Box>
        </MotionInView>
      </Container>
      <Container maxWidth='lg' sx={{ marginTop:'90px'}}>
        <Grid container spacing={5} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                  Latar Belakang
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  Pondok Pesantren Ibnu Sina didirikan sebagai jawaban terhadap semakin meningkatnya kebutuhan masyarakat akan pendidikan agama untuk anak-anak, yang di sisi lain juga mengharapkan anak-anak mereka memiliki keterampilan-keterampilan hidup yang menjadi tuntunan zaman modern saat ini.

Kami meyakini bahwa probelamatika pendidikan saat ini banyak berkaitan dengan lemahnya perhatian para pelaku pendidikan dalam membentuk perilaku, karakter dan cara berpikir anak. Tidak terkecuali paradigma masyarakat saat ini, yang seringkali melihat peran pendidikan hanya sebatas untuk memudahkan mendapat kerja.

Setiap anak dibekali berbagai potensi yang perlu diarahkan dan dibina sehingga teraktualiasi secara penuh. Lebih mendasar dari itu, mereka harus mampu memaknai jati dirinya sebagai hamba Allah dan tanggung jawabnya di muka bumi. Bukan hanya diajarkan bagaimana mencapai cita-cita, tetapi juga menyiapkan mentalitas di tengah berbagai kemungkinan masa depan yang tidak pasti. Bukan hanya tentang dunia, tetapi juga akhirat.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
          <Divider variant='middle' />
        </MotionInView>
      </Container>
      
      <Container maxWidth='lg' sx={{ marginTop:'90px'}} justifycontent='center'>
        <Grid container spacing={5} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                  Sejarah
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  Secara historis, pondok pesantren Ibnu Sina telah berdiri sejak sekitar tahun 1980-an. Saat itu K.H. Tatang Haetami membuka pengajian untuk warga sekitar, dalam bentuk pengajian majelis taklim, kuliah subuh, pengajian malam jum’at dan pengajian untuk remaja / pemuda. Hingga saat ini, kegiatan-kegiatan pengajian tersebut masih terus berlangsung di masjid jami Ibnu Sina Cibening.

Tidak berhenti di situ, K.H. Tatang Haitami, bersama para tokoh masyarakat Cibening saat itu, membentuk Yayasan berbadan hukum, Yayasan Ibnu Sina, sebagai titik tolak berdirinya lembaga-lembaga formal di tahun-tahun berikutnya.

Lembaga formal yang pertama kali berdiri adalah Madrasah Ibtidaiyah (MI), kemudian Raudhatul Athfal (RA), Madrasah Ibtidaiyah Unggulan (MIU), dan Pendidikan Anak Usia Dunia (PAUD). Setelah beberapa dekade berlalu, lalu tahun 2007, Sekolah Menengah Pertama (SMP Islam) Ibnu Sina berdiri. Selang dua tahun berikutnya, 2010, Pesantren Ibnu Sina mulai dibuka, lalu tahun 2012, SMA Plus Ibnu Sina.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
          <Divider variant='middle' />
        </MotionInView>
      </Container>


      <Container maxWidth='lg' sx={{ marginTop:'90px'}} justifycontent='center'>
        <Grid container spacing={5} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                Pertanyaan Umum
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Typography
                  onClick={handleClick}
                  id="faq1"
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    color: isLight ? '#4a4a4a' : 'common.white',
                    backgroundColor: 'darkgrey',
                    padding: '5px 20px',
                    borderRadius: 20,
                    fontSize: 18
                  }}
                >
                  Apakah wajib mukim untuk bersekolah di SMP dan SMA Ibnu Sina?
               </Typography>

                <Collapse in={open.faq1} timeout='auto' unmountOnExit>
                  <Typography
                      sx={{
                        mb: 5,
                        color: isLight ? 'text.secondary' : 'common.white',
                      }}
                    >
                    Ya, sejak tahun pelajaran 2019/2020, pondok pesantren Ibnu Sina hanya menerima santri mukim yang berasal dari SMP dan SMA Plus Ibnu Sina.
                  </Typography>
                </Collapse>


                <Typography
                  onClick={handleClick}
                  id='faq2'
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    color: isLight ? '#4a4a4a' : 'common.white',
                    backgroundColor: 'darkgrey',
                    padding: '5px 20px',
                    borderRadius: 20,
                    fontSize: 18
                  }}
                >
                  Apakah lulusan SMP diwajibkan melanjutkan ke SMA?
               </Typography>

               <Collapse in={open.faq2} timeout='auto' unmountOnExit>
                <Typography
                    sx={{
                      mb: 5,
                      color: isLight ? 'text.secondary' : 'common.white',
                    }}
                  >
                    Kurikulum pesantren Ibnu Sina dirancang sebagai kurikulum 6 tahun. Dengan demikian, para santri yang tidak menuntaskan selama enam tahun mondok, tidak dianggap alumni pesantren dan tidak diwisuda sebagai lulusan pesantren Ibnu Sina.
                  </Typography>
                </Collapse>

                <Typography
                  onClick={handleClick}
                  id='faq3'
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    color: isLight ? '#4a4a4a' : 'common.white',
                    backgroundColor: 'darkgrey',
                    padding: '5px 20px',
                    borderRadius: 20,
                    fontSize: 18
                  }}
                >
                  Apakah diajarkan kitab kuning?
               </Typography>

               <Collapse in={open.faq3} timeout='auto' unmountOnExit>
                <Typography
                    sx={{
                      mb: 5,
                      color: isLight ? 'text.secondary' : 'common.white',
                    }}
                  >
                    Ya kami mengajarkan kitab-kitab kuning dan juga kitab-kitab kontemporer.
                  </Typography>
                </Collapse>
               
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
          <Divider variant='middle'/>
        </MotionInView>
      </Container>
      
      <Container maxWidth='lg' sx={{ marginTop:'90px'}} justifycontent='center'>
      
      </Container>



      <Container maxWidth='lg' sx={{ mt:'90px'}} justifycontent='center'>
        <Grid container spacing={5} sx={{mb:'50px'}} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                  Pembentukan Karakter & Bakat
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                      Pengabdian
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Pengabdian merupakan salah satu program pendidikan karakter untuk para santri dalam bentuk kegiatan-kegiatan sosial dan keagamaan.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>
                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                      Pramuka
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Pembinaan pramuka merupakan salah satu kegiatan informal yang wajib diikuti oleh seluruh santri, sebagai wadah pembentukan karakterk sosial dan kepemimpinan.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                      Life-Skill
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Setidaknya ada lima kegiatan life-skill yang diajarkan kepada para santri Ibnu Sina yang berorientasi pada pembentukan karakter kemandirian dan wirausaha.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                      Pembinaan Bakat
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Selain kegiatan-kegiatan ex-school yang bersifat rutin, para santri juga diberi kesempatan untuk menampilkan bakat-bakat mereka dalam berbagai even kegiatan bulanan.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>
                </Grid>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
        <Divider variant='middle' />
        </MotionInView>
      </Container>


      <Container maxWidth='lg' sx={{ mt:'90px'}} justifycontent='center'>
        <Grid container spacing={5} sx={{mb:'50px'}} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                Program Unggulan
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Tahfizul Quran
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Ponpes Ibnu Sina bukan pesantren tahfizh. Namun demikian, ada target minimal hafalan yang harus dicapai santri selama enam tahun, yaitu enam juz, atau satu juz per tahun.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>
                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Fiqh Amaliah
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Program ini adalah program penguasaan praktek-praktek ibadah dasar secara komprehensif dan bertahap, meliputi: baca tulis quran, tajwid, imla, praktek solat, doa-doa, khutbah, dzikir dll.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Bahasa Asing
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Dari tahun ke tahun, kami terus menyempurnakan program-program pembinaan bahasa asing, Arab dan Inggris, baik dalam ranah kurikulum atau pun kesiswaan.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Kepemimpinan
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Selain pramuka, karakter kepemimpinan santri dibentuk melalui kegiatan-kegiatan kepengurusan dan LDK (Latihan Dasar Kepemimpinan).
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>
                </Grid>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
        <Divider variant='middle' />
        </MotionInView>
      </Container>

      <Container maxWidth='lg' sx={{ mt:'90px'}} justifycontent='center'>
        <Grid container spacing={5} sx={{mb:'50px'}} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                Even Tahunan
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Tahfizul Quran
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Kegiatan wisuda santri diperuntukan bagi para santri yang telah menuntaskan pendidikan pesantrennya, yaitu santri yang telah menyelsaikan jenjang SMA.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>
                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Tabligh Akbar
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Diselenggarakan dalam rangka memperingati milad ponpes Ibnu Sina, yang diawali dengan serangkaian kegiatan pengabdian dan perlombaan.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Festival Film Akhir Tahun
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Penayangan film-film dokumenter kegiatan tahunan dan film-film pendek karya kreatif anak-anak santri.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>

                  <Grid item xs={12} md={6} dir='ltr'>
                    <Typography variant='h5' sx={{ mb: 3}}>
                    Pagelaran Seni
                    </Typography>
                      <Typography
                        sx={{
                          mb: 5,
                          color: isLight ? 'text.secondary' : 'common.white',
                        }}
                      >
                      Diselenggarkaan di permulaan tahun pelajaran. Sebuah ajang para santri menampilkan kebolehannya: paduan suara, drama, tarian daerah dll.
                    </Typography>
                    <Button sx={{marginBottom: 10}} variant='contained'>Selengkapnya</Button>

                  </Grid>
                </Grid>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
        <Divider variant='middle' />
        </MotionInView>
      </Container>

      <Container maxWidth='lg' sx={{ marginTop:'90px'}} justifycontent='center'>
        <Grid container spacing={5} justifycontent='center'>
          <Grid item xs={12} md={4} dir='ltr'>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: isMobile ? 'center' : 'right',
              }}
            >
              <MotionInView variants={varFadeInUp}>
                <Typography variant='h3' sx={{ mb: 3, mr: isMobile ? '0' : '50px' }}>
                Penghargaan
                </Typography>
              </MotionInView>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ContentStyle>
              

              <MotionInView variants={varFadeInUp}>
                <Typography variant='h5' sx={{ mb: 2}}>
                  Pesantren Ibnu Sina Mewakili Pamijahan Di Ajang Ekopontren Award 2019
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  admin - September 16, 2019
                </Typography>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >

                  IBNUSINA.SCH.ID. BOGOR – Pondok pesantren Ibnu Sina terpilih menjadi perwakilan Kecamatan Pamijahan untuk Ekopontren Award, sebuah ajang penghargaan pesantren di bidang lingkungan hidup,…
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                Continue Reading
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          

        </Grid>
        <MotionInView variants={varFadeInUp}>
        <Divider variant='middle' />
        </MotionInView>
      </Container>
      
      
    </RootStyle>
  );
}
