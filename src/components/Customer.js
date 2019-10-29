import React from 'react'; // 리액트 라이브러리를 불러올 수 있게 하는 것.

// Customer 클래스를 정의하는데,
// Customer 클래스는 리액트의 컴포넌트로 작성이 된 클래스임을 선언한다.
// 즉, React.Component는 일종의 라이브러리이자 클래스라고 할 수 있다.
class Customer extends React.Component {
    
    // React.Component 라이브러리에 render란 함수가 있다.
    // render는 항상 수행되는 것으로써,
    // Customer 라는 컴포넌트를 실제 화면에 그리고자 할 때,
    // 실제로 그려지는 내용이 담기게 된다.
    render() {
        // props는 React.component가 포함하고 있는 내용이므로 this 키워드를 사용할 수 있음.
        // 전달받은 프로퍼티를 사용할 때 this.props.----를 사용한 것임.
        return (
            <div>
                <CustomerProfile id={this.props.id} name={this.props.name} image={this.props.image} />
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job} />
            </div>
        );
    }
    // Customer라는 컴포넌트의 작성이 완료되었다. App.js에서 이제 이 Customer 컴포넌트를 쓰자.
}

// 하나의 컴포넌트를 추가로 정의하자
class CustomerProfile extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile" />
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        );
    }
}

export default Customer; // 다른 라이브러리가 Customer 라이브러리를 쓸수 있게 내보내는 것.