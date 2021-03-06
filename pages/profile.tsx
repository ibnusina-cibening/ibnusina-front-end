// material
import { styled } from '@mui/material/styles';
// components
import Page from 'src/components/Page';
import MainLayout from 'src/layouts/main';
import {FC} from 'react';

import {
  LandingDarkMode,
}
  from 'src/components/_external-pages/profile';

const RootStyle: FC<any> = styled(Page)({
  height: '100%',
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

function handleClick(event: { preventDefault: () => void; }) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ProfilePage() {
  return (
    <MainLayout>
      <RootStyle
        title='IBNU SINA | Profil'
        id='move_top'
      >
        <LandingDarkMode />
        {/* <LandingCleanInterfaces /> */}
      </RootStyle>
    </MainLayout>
  );
}