import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  {
    title: 'Profil',
    path: '/profile',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  },
  {
    title: 'Pendaftaran',
    // path: PATH_DASHBOARD.root,
    path: '/pendaftaran',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  },
  // {
  //   title: 'Blog',
  //   // path: PATH_DASHBOARD.root,
  //   path: '/#2',
  //   icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  // },
  // {
  //   title: 'Portofolio',
  //   // path: PATH_DASHBOARD.root,
  //   path: '/#3',
  //   icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  // },
  // {
  //   title: 'Daftar',
  //   // path: PATH_DASHBOARD.root,
  //   path: '/#4',
  //   icon: <Icon icon={fileFill} {...ICON_SIZE} />,
  // },
];

export default menuConfig;
