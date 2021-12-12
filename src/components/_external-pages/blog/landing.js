// material
// import { alpha, useTheme, styled } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';
import { Grid, Container} from '@mui/material';
// import { motion } from 'framer-motion';
//
// import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
// import { useMediaQuery } from '@mui/material';
import BlogPostCard from '../../blog/BlogPostCard';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
          theme.palette.grey[300]
        } 100%)`
      : 'none',
}));

// const CardStyled = styled(Card)`
//   padding: 20px;
// `;

// const GridCustom = styled(Grid)({
//   '& > div': {
//     height: '100%',
//   },
//   '& > div > div': {
//     height: '100%',
//     paddingBottom: 20
//   },
//   '& > div > div > div:nth-child(2)': {
//     padding: '0 20px !important'
//   },
//   '& > div > div > div:nth-child(1)': {
//     marginBottom: 15,
//     height: 'auto',
//     background: 'red',
//     width: '100%',
//   }
// });

// const ImgCustom = styled(motion.img)({
//   width: '100vw',
//   maxHeight: '153px',
//   objectFit: 'cover'
// });


const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

// const variantScreenLeft = {
//   initial: COMMON,
//   animate: { ...COMMON, translateX: '-50%', translateY: 40, opacity: 1 },
// };
// const variantScreenCenter = {
//   initial: COMMON,
//   animate: { ...COMMON, opacity: 1 },
// };
// const variantScreenRight = {
//   initial: COMMON,
//   animate: { ...COMMON, translateX: '50%', translateY: -40, opacity: 1 },
// };

// ----------------------------------------------------------------------

export default function LandingBlog({data}) {
  // console.log(data);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  // const isLight = theme.palette.mode === 'light';
  // const isRTL = theme.direction === 'rtl';

  // const screenLeftAnimate = variantScreenLeft;
  // const screenCenterAnimate = variantScreenCenter;
  // const screenRightAnimate = variantScreenRight;
  // console.log(data);
  return (
    <RootStyle>
      <Container maxWidth='lg'>
        <Grid container spacing={3} direction='row'>
          
          {
            data.map((v,k)=>(
              
              <BlogPostCard key={v.id} post={v} index={k} />
            ))
          }
          
        </Grid>
      </Container>
    </RootStyle>
  );
}
