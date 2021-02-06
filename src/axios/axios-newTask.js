import axios from 'axios';
export default axios.create({
	baseURL: 'https://abzagencytest.firebaseio.com/'   
	//baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2'   
})