/* eslint-disable*/

const allTask =(cd)=>{
const val = JSON.parse(localStorage.getItem('tasks')||'[]')
const b =  val ? val : []
cd(b)
}

export default allTask;
 