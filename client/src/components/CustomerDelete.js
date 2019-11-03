import React from 'react'; // 리액트 라이브러리 추가
import Dialog from '@material-ui/core/Dialog';
import DialogAction from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    deleteCustomer(id) {
        const url = '/api/customers' + id;

        // REST API 에서는 DELETE method로 해당 경로에 접속했을때, 삭제가 이뤄지게 하는게 합리적임.
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh(); // 삭제 이후 재출력.
    }

    // 고객 추가 버튼을 누른 경우 (애로우 펑션은 자동 바인딩 처리됨. 즉, 동적 생성에도 바인딩?)
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    // 닫기 버튼을 누른 경우
    handleClose = () => {
        this.setState({
            open: false
        });
    }

    reunder() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={(e) => { this.handleClickOpen }}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        삭제 경고
                </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.deleteCustomer(this.props.id)}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
} 