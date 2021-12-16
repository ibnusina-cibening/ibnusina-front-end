// layouts
import MainLayout from 'src/layouts/main';
// material
import { styled } from '@mui/material/styles';
// components
import Page from 'src/components/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingHugePackElements,
} from 'src/components/_external-pages/landing';
import React, { FC } from 'react';

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)({
//   height: '100%',
// });
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
  return (
    <MainLayout>
      <RootStyle
        title='IBNU SINA | Islamic Boarding School'
        id='move_top'
      >
        <LandingHero />
        <ContentStyle>
          <LandingMinimal />
          <LandingHugePackElements />
        </ContentStyle>
      </RootStyle>
    </MainLayout>
  );
}