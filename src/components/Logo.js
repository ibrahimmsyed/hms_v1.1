import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 120, height: 50, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 165 67">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_MAIN} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_MAIN} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_DARK} />
          </linearGradient>
        </defs>
        <g
          fill={PRIMARY_MAIN}
          fillRule="evenodd"
          stroke="none"
          strokeWidth="1"
          transform="translate(0.000000,67.000000) scale(0.100000,-0.100000)"
        >
          <path
            fill="url(#BG1)"
            d="M112 588 c-18 -18 -17 -352 2 -367 9 -8 81 -11 237 -9 l224 3 3 23
            c7 49 -6 52 -209 52 l-189 0 0 138 c0 122 -2 141 -18 155 -22 20 -34 21 -50 5z"
          />
          <path
            fill="url(#BG2)"
            d="M607 582 c-22 -24 -21 -35 1 -55 15 -14 49 -17 201 -19 160 -3 185
            -5 195 -20 8 -13 6 -22 -8 -37 -18 -20 -30 -21 -201 -21 -127 0 -185 -4 -193
            -12 -17 -17 -16 -169 1 -192 8 -11 23 -17 38 -14 22 3 24 8 29 68 l5 65 172 5
            173 5 31 31 c58 59 47 151 -24 194 -29 18 -51 20 -218 20 -167 0 -188 -2 -202
            -18z"
          />
          <path
            fill="url(#BG3)"
            d="M1112 588 c-8 -8 -12 -64 -12 -184 0 -181 5 -200 47 -192 16 3 18 17
            21 126 1 67 6 122 10 122 4 0 37 -30 72 -66 97 -98 88 -98 180 -8 54 52 81 72
            85 63 2 -8 6 -63 7 -124 3 -110 3 -110 28 -110 l25 0 0 189 c0 146 -3 190 -13
            194 -7 2 -57 -39 -111 -92 -53 -53 -101 -96 -105 -96 -5 0 -53 43 -108 95 -55
            52 -103 95 -107 95 -4 0 -12 -5 -19 -12z"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
