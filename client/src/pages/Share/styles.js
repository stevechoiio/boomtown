const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    background: 'white',
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 20
    }
  }
});

export default styles;
