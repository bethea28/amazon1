import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const headerBox = {
  width: 1,
  height: 1 / 4,
  my: 3,
  mr: 2,
  backgroundColor: '#EAEAEA',
  borderRadius: '5px',
  fontSize: '0.875rem',
  fontWeight: '700',
  textAlign: 'center',
  label: "profile-header-picture"
}

export const bottomOutterBox = {
  width: 2 / 3,
  height: 3 / 4,
  mx: "auto",
  pl: 3,
  py: 1,
  backgroundColor: '#EAEAEA',
  borderRadius: 2,
  fontSize: '0.875rem',
  fontWeight: '700',
  textAlign: 'left',
  label: "My profile section"
}