import HomeIcon from 'material-ui-icons/Home';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import SearchIcon from 'material-ui-icons/Search';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
import MessageIcon from 'material-ui-icons/Message';
import HistoryIcon from 'material-ui-icons/History';
import AttachMoneyIcon from 'material-ui-icons/AttachMoney';

const AppPages = [
  {
    pathname: '/',
    title: 'home-page.title',
    icon: HomeIcon
  },
  {
    pathname: '/profile',
    title: 'profile-page.title',
    icon: AccountCircleIcon
  },
  {
    pathname: '/findmatch',
    title: 'findmatch-page.title',
    icon: SearchIcon
  },
  {
    pathname: '/mymatches',
    title: 'mymatches-page.title',
    icon: FolderOpenIcon
  },
  {
    pathname: '/messages',
    title: 'messages-page.title',
    icon: MessageIcon
  },
  {
    pathname: '/history',
    title: 'history-page.title',
    icon: HistoryIcon
  },
  {
    pathname: '/cashier',
    title: 'cashier-page.title',
    icon: AttachMoneyIcon
  }
];

export default AppPages;
