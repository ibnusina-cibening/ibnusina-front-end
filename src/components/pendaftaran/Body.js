import { alpha, styled } from '@mui/material/styles';
import { Grid, Container, Card, CardContent, Typography, CardHeader, CardMedia, CardActions, Button} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
// import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
import { useMediaQuery } from '@mui/material';
import { InfoPendaftaran , BiayaRutin } from './all';
import SyaratPendaftaran from './SyaratPendaftaran';
import SyaratKetentuan from './SyaratKetentuan';


const RootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(15, 0),
    backgroundImage:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
            theme.palette.grey[300]
          } 100%)`
        : 'none',
}));

export default function Body(){
    return (
        <RootStyle>
            
            <Container maxWidth='lg'>
                <Grid container gap={5} direction='column'>
                    <Grid item>
                        <Card variant='outlined'>
                            <CardHeader
                                title='PERHATIAN'
                                sx={{padding: '20px', textAlign: 'center'}}
                            />
                            <CardMedia>
                                <div style={{position: 'relative', height: '194px'}}>
                                    <Image src='https://web.kominfo.go.id/sites/default/files/kominfo-kemenkes-banner-corona.png' layout='fill' objectFit='cover' />

                                </div>
                            </CardMedia>
                            
                            <CardContent>
                                <p>Kami beritahukan bahwa selama masa wabah korona belum mereda, pedaftaran dapat dilakukan secara online. Caranya silahkan klik dan isi formulir online di bawah. Selanjutnya, silahkan hubungi nomor: <b>081283946572 (Sidiq herdiansyah)</b> untuk langkah selanjutnya.</p>
                            </CardContent>
                            <CardActions sx={{padding: '24px', paddingTop: 0}}>
                                <Button variant='contained'>
                                    <a href='https://forms.gle/wBdm89C4fEGncBic7' target='_blank' style={{textDecoration: 'none', color: 'white'}}>Daftar</a>
                                </Button>
                            </CardActions>
                        </Card>

                    </Grid>

                    <Grid items>
                        <p>Pendaftaran santri baru tahun pelajaran 2022/2023 kembali dibuka. Berikut informasi pendaftaran:</p>
                    </Grid>

                    <InfoPendaftaran/>
                    <BiayaRutin/>
                    <SyaratPendaftaran />
                    <SyaratKetentuan />
                    
                </Grid>
            </Container>
        </RootStyle>
    );
}