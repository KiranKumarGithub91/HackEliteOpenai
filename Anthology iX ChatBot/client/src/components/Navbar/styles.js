import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },

  clearButton: {
    '@media (min-width: 768px)': {
      display: 'flex',
    },
    display: 'none',
    backgroundColor: "#f2f2f2",
    color: "#333333",
    '&:hover': {
      backgroundColor: "#BDBDBD",
    },
  },
  clearButtonMobile: {
    backgroundColor: "#f2f2f2",
    color: "#333333",
    '&:hover': {      
      backgroundColor: "#BDBDBD",
    },
  },
  logout: {
    '@media (min-width: 768px)': {
      display: 'flex',
    },
    display: 'none',
    backgroundColor: '#e32929',
    '&:hover': {
      backgroundColor: '#bd2424',
    },
  },
  logoutMobile: {
    backgroundColor: '#e32929',
    '&:hover': {
      backgroundColor: '#bd2424',
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '420px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
},
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));