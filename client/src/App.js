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

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/any',
  'name': '이순신',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '박혁거세',
  'birthday': '901022',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '홍길동',
  'birthday': '911121',
  'gender': '남자',
  'job': '대학생'
}
];

class App extends Component {
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
            {
              customers.map(oCustomerInfo => { // 여기서 aCustomerInfo는 Customers 배열의 원소 하나하나를 의미
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
              })
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