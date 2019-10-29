import React, { Component } from 'react';
import Customer from './components/Customer'; // Customer Class는 App Class의 외부에 있기 때문에, import 해주어야 한다.
import './App.css';

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
    return (
      // App 컴포넌트 안에 Customer 컴포넌트가 포함된 형태로 화면에 출력 될것임.
      <div>
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
      </div>
    );
  }
}

export default App;

// import해주고, render 내부에 Customer 컴포넌트 태그를 넣었다면
// 이로써 Customer 컴포넌트를 불러와서 그것을 App 컴포넌트 안에서 출력할 수 있도록 만든 것임.