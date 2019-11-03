import React from 'react'; // 리액트 라이브러리 추가

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        const url = '/api/customers' + id;
        
        // REST API 에서는 DELETE method로 해당 경로에 접속했을때, 삭제가 이뤄지게 하는게 합리적임.
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh(); // 삭제 이후 재출력.
    }

    reunder() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
} 