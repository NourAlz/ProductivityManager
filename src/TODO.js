import React, {Component} from 'react';
import { GENERALAPI } from './API';

export class TODO extends Component{
    constructor(props){
        super(props);

        this.state = {
            pending: [],
            newTask: ''
        };
    }

    /*This method retrieves the result from the called API method, ViewPending, and stores the result in the pre-defined
        array. The API method retrieves the tasks that are still pendning, returning the whole object. Thus the
        obtained array is an array of objects.
    */
    refreshList(){
        fetch(GENERALAPI.API_URL + 'Tasks/ViewPending')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pending:data});
            console.log(data[0]);
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    /* The below method is responsible about handling the change when we mark a task as done. The API method takes the ID
        of the finished task, and updates its pending state to false. After that we re-call the main method, refreshList
        to render the changed result in the page. 
    */
    markDone(id) {
        fetch(GENERALAPI.API_URL + 'Tasks/Update/' + id , {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => this.refreshList())
            .catch((error) => console.error('Error:', error));
    }

    /*The below methods are responsible for handling the addition of tasks to the list. The handleInputChange updates the
        text value of the written task from the input bar. The addTask checks if the input is empty to return nothing, else
        it creates a task object, having similar structure to the API object returned, with default and dynamic values, and calls
        the API add method before refreshList calling, and reseting the newTask value to null for new additions.
    */

    handleInputChange = (event) => {
        this.setState({ newTask: event.target.value }); 
    };

    addTask = () => {
        const { newTask } = this.state;
        if (newTask.trim() === '') return; 

        const task = {
            todo: newTask,                     
            pending: 1,                        
            date_day: new Date().toISOString() 
        };

        
        fetch(GENERALAPI.API_URL + 'Tasks/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task), 
        })
            .then(() => {
                this.refreshList(); 
                this.setState({ newTask: '' }); 
            })
            .catch((error) => console.error('Error:', error));
    };
    
    /*The render function defines the UI elements to be displayed for this page. Starting with a header, input bar with a button,
        and the table with 2 columns, one for the text of the task, and the other for checkboxes.
    */
    render(){
        const{
            pending
        }=this.state;

        return(
            <div>
                <h3 className='d-flex justify-content-center m-3'>
                    To-Do List
                </h3>

                <div className='input-group mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Enter Your Daily Tasks'
                        value={this.state.newTask}
                        onChange={this.handleInputChange}
                    />
                    <button className='btn btn-light btn-outline-dark' onClick={this.addTask}>Add</button>
                </div>
                
                <table className='table table-light table-striped' style={{marginTop: '20px'}}>
                    <thead className='table-dark'>
                        <tr>
                            <th>Task</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending.map(p=>
                            <tr key={p.Task}>
                                <td>{p.todo}</td>
                                <td>
                                    <input
                                        type='checkbox'
                                        onChange={() => this.markDone(p.id)}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}