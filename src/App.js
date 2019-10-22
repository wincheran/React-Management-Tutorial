import React, { Component } from 'react'; 
import Customer from './components/Customer'; // Customer Class는 App Class의 외부에 있기 때문에, import 해주어야 한다.
import './App.css';

const customer = {
  'name': '이순신',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
}

class App extends Component {
  render() {
    return (
      <Customer
        name={customer.name} // Customer 컴포넌트는 이러한 방식으로 Props를 전달받을 수 있음.
        birthday={customer.birthday}
        gender={customer.gender}
        job={customer.job}
      /> // App 컴포넌트 안에 Customer 컴포넌트가 포함된 형태로 화면에 출력 될것임.

    );
  }
}

export default App;

// import해주고, render 내부에 Customer 컴포넌트 태그를 넣었다면
// 이로써 Customer 컴포넌트를 불러와서 그것을 App 컴포넌트 안에서 출력할 수 있도록 만든 것임.