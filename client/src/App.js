import React, { Component } from 'react';
import Customer from './components/Customer'; // Customer Class는 App Class의 외부에 있기 때문에, import 해주어야 한다.
import './App.css';
import Paper from '@material-ui/core/Paper'; // 페이퍼 컴포넌트는 어떠한 컴포넌트의 외부를 감싸기 위해 사용하는 라이브러리 (그냥 div대신 쓰는 느낌임..))
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles'; // 스타일 라이브러리 호출

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3, // 가중치 3
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
});

class App extends Component {

  state = {
    customers: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res})) // 여기서 res는 아래 callApi에서 return 된 body임
      .catch(err => console.log(err)); // error가 발생하면 콘솔로그 찍어줌.
  };

  callApi = async () => {
    const response = await fetch('/api/customers'); // localhost의 api 경로에 접근해서
    const body = await response.json(); // await은 아마.. success 되면 데이터가 들어가는 구조임
    // 정리하면, 위의 경로로 가서 데이터를 가져오고 그 데이터를 json 으로 변경해서 body 변수에 담는것임.

    return body;
  };

  render() {
    const { classes } = this.props; // 변수 생성하고, 위에서 만든 스타일이 적용되게 할 예정.

    return (
      // App 컴포넌트 안에 Customer 컴포넌트가 포함된 형태로 화면에 출력 될것임.
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.customers ? this.state.customers.map(oCustomerInfo => { // 여기서 aCustomerInfo는 Customers 배열의 원소 하나하나를 의미
                return (
                  <Customer
                    key={oCustomerInfo.id} // 메서드 map을 사용하려면 각 원소를 구분할 수 있는 'key를 반드시 넣어줘야 함'
                    id={oCustomerInfo.id}
                    image={oCustomerInfo.image}
                    name={oCustomerInfo.name} // Customer 컴포넌트는 이러한 방식으로 Props를 전달받을 수 있음.
                    birthday={oCustomerInfo.birthday}
                    gender={oCustomerInfo.gender}
                    job={oCustomerInfo.job}
                  />

                );
              }) : ""
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App); // style를 적용해서 App을 내보내는 것

// import해주고, render 내부에 Customer 컴포넌트 태그를 넣었다면
// 이로써 Customer 컴포넌트를 불러와서 그것을 App 컴포넌트 안에서 출력할 수 있도록 만든 것임.