import { Icon } from '@iconify/react';
import youtubeFill from '@iconify/icons-ant-design/youtube-filled';
import instagramFill from '@iconify/icons-ant-design/instagram-filled';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { Link as ScrollLink } from 'react-scroll';
// next
import NextLink from 'next/link';
// material
import { styled } from '@mui/material/styles';
import {
  Grid,
  Link,
  Stack,
  Divider,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
//
import Logo from '../../components/Logo';

// ----------------------------------------------------------------------

const TextBottom = styled(Typography)(({theme})=>{
  return {
    marginTop: 0,
    [theme.breakpoints.up('sm')]: {
      marginTop: 20
    }
  }
})

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill, link: '//www.facebook.com/ibnusinamedia' },
  { name: 'Instagram', icon: instagramFill, link: '//www.instagram.com/ponpes_ibnusina' },
  { name: 'Youtube', icon: youtubeFill, link: '//www.youtube.com/c/ibnusinamedia' },
  // { name: 'Twitter', icon: twitterFill },
];

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: '#' },
      { name: 'Contact us', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'support@ibnusina.sch.id', href: '#' },
      { name: 'Bogor, District 3', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth='lg' sx={{ pt: 10 }}>
        <Grid
          direction='column'
          container
          alignItems='center'
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item sx={{ mb: 3 }}>
            <ScrollLink to='move_top' spy smooth>
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </ScrollLink>
          </Grid>
          <Grid item>
            <Typography variant='body2' sx={{ pr: { md: 5 }, textAlign: 'center', padding: '0 !important'}}>
              Lorem Ipsum Dorom
            </Typography>

            <Stack
              spacing={1.5}
              direction='row'
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 2, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton key={social.name} color='primary' sx={{ p: 1 }}>
                  <a href={social.link} target='__blank' style={{textDecoration: 'none', color: '#00AB55'}}>
                    <Icon icon={social.icon} width={16} height={16} />
                  </a>
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent='space-between'
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component='p' variant='overline'>
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <NextLink key={link.name} href={link.href} passHref>
                        <Link
                          color='inherit'
                          variant='body2'
                          sx={{ display: 'block' }}
                        >
                          {link.name}
                        </Link>
                      </NextLink>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid> */}
        </Grid>

        <TextBottom
          component='p'
          variant='body2'
          sx={{
            pb: 5,
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          © 2021. All rights reserved
        </TextBottom>
      </Container>
    </RootStyle>
  );
}
