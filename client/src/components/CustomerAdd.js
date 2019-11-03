// 서버와의 통신을 목적으로 사용하는 라이브러리
import React from 'react'; // Q) 이건 항상 해줘야 하나?
import { post } from 'axios'; // POST 방식으로 전달하기 위해서 import
import Dialog from '@material-ui/core/Dialog';
import DialogAction from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'; // input type="text"를 위해 쓰는 라이브러리
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null, // 실제 파일 그 자체.
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', // 단순히 파일 명
            open: false // dialog가 열려있는지 확인하기 위한 플래그.
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); // reload 대신, 부모 컴포넌트가 자식 컴포넌트에게 Props를 건네주는 방식을 사용.
            });

        // 임의로 state를 초기화 해줌. (일부러)
        this.setState({
            file: null,
            userName: '',
            birthdat: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });

        // 원래는 여기서 리로드가 아닌 리액트의 변경점만 바뀌는 것 사용해야 함. 
        // (React는 SPA임, 전체 페이지를 새로고침하는 것은 비효율적)
        // window.location.reload();
        // 이러한 reload는 비동기적인 addCustomer의 작업 결과가 돌아온 뒤 동작하는게 아니므로, 순서적으로 보장받지 못할 수 있다.
    }

    handleFileChange = (e) => {
        // 파일이 바뀌면 실제로 state 변수의 file 프로퍼티를 바꿔준다.
        this.setState({
            file: e.target.files[0], // target이란 이벤트(e)가 실제로 발생한 태그를 가리킴. 거기서 file값을 가져옴.
            // 그 중에 굳이 files의 첫번째 값을 가져오는 이유는? 일반적으로 웹 사이트에서 파일을 여럿 업로드할 수 있게 하지만 우리는 하나만 업로드 되게 해야 하기 때문임. 
            fileName: e.target.value
        })
    }

    //이러한 handle--- 함수들은 state를 관리하기 위한 함수임.
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value; // e.target.name을 상당히 잘 썼네.. state의 프로퍼티 명들과 name이 공통된 명칭을 가져야만 되는거네.. 메모
        this.setState(nextState);
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
            file: null,
            userName: '',
            birthdat: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file); // this.state.file에 담겨있는 binary 데이터를 'image'라는 이름으로 전송하기 위한 세팅.
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // 기본적으로 파일이 포함된 데이터를 서버로 전송할 때는 웹 표준에 맞는 헤더를 추가해야 함.
        const config = {
            headers: {
                'content-type': 'multipart/form-data' // 전달하고자 하는 데이터에 파일이 있을때 헤더 세팅해줘야 하는 것 multipart/form-data
            }
        }

        // axios에 포함되어 있는 post 함수를 이용해서, 해당 경로(url) 데이터(formData)를 설정(config)에 맞게 보낸다
        // 실제로 서버로 데이터를 보내는 것임!
        return post(url, formData, config);
    }

    render() {
        const { classes } = this.props; // 디자인 변수를 먹이기 위해서 classes 변수 초기화.

        return (
            /*
            // 해당 form을 submit 시키면 연결해둔 유저함수(handleFormSubmit)가 동작
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>  
                <button type="submit">추가하기</button>
            </form>
            */
            <div>
                <Button variant="contained" color="primary" onclick={this.handleClickOpen} >
                    고객 추가하기
               </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classess.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> <br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>추가</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);