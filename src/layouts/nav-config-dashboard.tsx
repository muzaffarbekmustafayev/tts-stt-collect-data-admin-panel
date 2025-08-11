import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Users',
    path: '/users',
    icon: icon('ic-user'),
  },
  {
    title: 'Sentences',
    path: '/sentences',
    icon: icon('ic-sentence'),
  },
  {
    title: 'Audios',
    path: '/audios',
    icon: icon('ic-audio'),
  },
  {
    title: 'Checked audios',
    path: '/checked',
    icon: icon('ic-checked'),
  },
  // {
  //   title: 'Logs',
  //   path: '/logs',
  //   icon: icon('ic-audio'),
  // },
];
