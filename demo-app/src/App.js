import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';
// routes
import Routers from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        TransitionComponent={Slide}
        maxSnack={3}
      >
        <Routers />
      </SnackbarProvider>
    </ThemeConfig>
  );
}
