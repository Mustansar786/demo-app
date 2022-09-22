import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import { appLogoIcon } from '../assets';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={appLogoIcon} sx={{ width: 120, ...sx }} />;
}
