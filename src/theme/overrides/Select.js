import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// ----------------------------------------------------------------------

export default function Select(v) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon
      },

      styleOverrides: {
        root: {}
      }
    }
  };
}
