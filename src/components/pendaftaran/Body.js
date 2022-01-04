import { alpha, styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { InfoPendaftaran , BiayaRutin, SyaratPendaftaran, SyaratKetentuan, Map } from './all';
import CoverHero from './CoverHero';


const RootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(15, 0, 0, 0),
    backgroundImage:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
            theme.palette.grey[300]
          } 100%)`
        : 'none',
    [theme.breakpoints.down('sm')]:{
        padding: theme.spacing(10,0)
    }
}));
const ContentStyle = styled('div')(({ theme }) => ({
    zIndex: 100,
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(10, 15),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]:{
        padding: theme.spacing(10, 2),
    }
}));

export default function Body(){
    return (
        <RootStyle>
            <CoverHero/>
                <ContentStyle>
                    <Grid container gap={5} direction='column'>
                        <InfoPendaftaran/>
                        <BiayaRutin/>
                        <SyaratPendaftaran />
                        <SyaratKetentuan />
                        <Map />
                    </Grid>
                </ContentStyle>
        </RootStyle>
    );
}