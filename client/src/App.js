import React, { Component } from 'react';
import Customer from './components/Customer'; // Customer Class는 App Class의 외부에 있기 때문에, import 해주어야 한다.
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper'; // 페이퍼 컴포넌트는 어떠한 컴포넌트의 외부를 감싸기 위해 사용하는 라이브러리 (그냥 div대신 쓰는 느낌임..))
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles'; // 스타일 라이브러리 호출

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1000
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class App extends Component {

  constructor() {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      searchKeyword: ''
    };
  }

  stateRefresh = () => {
    // state 초기화
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });

    // 고객목록을 다시 불러오는 메서드 호출
    this.callApi()
      .then(res => this.setStatus({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // 0.02초 단위로 계속해서 호출
    this.callApi()
      .then(res => this.setState({ customers: res })) // 여기서 res는 아래 callApi에서 return 된 body임
      .catch(err => console.log(err)); // error가 발생하면 콘솔로그 찍어줌.
  };

  callApi = async () => {
    const response = await fetch('/api/customers'); // localhost의 api 경로에 접근해서
    const body = await response.json(); // await은 아마.. success 되면 데이터가 들어가는 구조임
    // 정리하면, 위의 경로로 가서 데이터를 가져오고 그 데이터를 json 으로 변경해서 body 변수에 담는것임.

    return body;
  };

  progress = () => {
    const { completed } = this.state; // 상태 변수를 가져와서..
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState); 
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });

      return data.map((c) => { // 여기서 c는 Customers 배열의 원소(고객 객체) 하나하나를 의미
        return <Customer
          stateRefresh={this.stateRefresh}
          key={c.id} // 메서드 map을 사용하려면 각 원소를 구분할 수 있는 'key를 반드시 넣어줘야 함'
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
        />
      });
    }

    const { classes } = this.props; // 변수 생성하고, 위에서 만든 스타일이 적용되게 할 예정.
    const cellList = ["번호", "프로필 이미지", "이름", "생년월이", "성별", "직업", "설정"];

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객관리 시스템
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword} // 2. 변화된 state의 새 값을 받아온다. 존나 신기하네
                onChange={this.handleValueChange} // 1. 값의 변화가 생기면 state 내부 searchKeyword가 바뀌고
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ?
                filteredComponents(this.state.customers) : 
                <TableRow>
                  <TableCell colspan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App); // style를 적용해서 App을 내보내는 것

// import해주고, render 내부에 Customer 컴포넌트 태그를 넣었다면
// 이로써 Customer 컴포넌트를 불러와서 그것을 App 컴포넌트 안에서 출력할 수 있도록 만든 것임.