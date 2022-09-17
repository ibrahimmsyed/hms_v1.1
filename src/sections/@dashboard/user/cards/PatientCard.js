import PropTypes from 'prop-types';
// Routes
import { Link as RouterLink } from 'react-router-dom';
import { paramCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Link } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';
//  Routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  isSearch: PropTypes.bool
};

export default function UserCard({ user, isSearch }) {
  const { name, cover, position, follower, totalPost, avatarUrl, following } = user;
  const redirectLink = isSearch ? `${PATH_DASHBOARD.labs.new(name)}` : `${PATH_DASHBOARD.patient.edit(name)}`
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>
      <Link to={redirectLink} color="inherit" component={RouterLink}>
        <Typography variant="subtitle1" sx={{ mt: 6 }}>
          {name}
        </Typography>
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {position}
      </Typography>

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Gender
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Contact No.
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(totalPost)}</Typography>
        </div>
      </Box>
    </Card>
  );
}
