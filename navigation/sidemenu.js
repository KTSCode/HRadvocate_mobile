import Test from './test';
import Test2 from './test2';
import Test3 from './test3';
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator(
  {
    Test: {
      screen: Test,
    },
    Test2: {
      screen: Test2,
    },
    Test3: {
      screen: Test3,
    },
  },
  {
    drawerWidth: 300,
  },
);
