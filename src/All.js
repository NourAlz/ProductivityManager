import React, {Component} from 'react';
import { GENERALAPI } from './API';

export class All extends Component{
    constructor(props){
        super(props);

        this.state = {
            all: []
        };
    }

    /*The refreshList function here calls the ViewAll API method, which returns all the tasks present in the database,
        assigning the result to the pre-defined array.
    */
    refreshList(){
        fetch(GENERALAPI.API_URL + 'Tasks/ViewAll')
        .then(response=>response.json())
        .then(data=>{
            this.setState({all:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    /*The render function of this page is simpler with only a header and the table containing the tasks. The table is customized
        in such that the done tasks' cells will be green, whereas the pending will be red. The table serves as a full record of tasks.
    */
    render(){
        const{
            all
        }=this.state;

        return(
            <div>
                <h3 className='d-flex justify-content-center m-3'>
                    All Tasks 
                </h3>
                
                <table className='table table-light table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Task</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all.map(a=>
                            <tr key={a.Task} className={a.pending === 0 ? 'table-success' : 'table-danger'}>
                                <td>{a.todo}</td>
                                <td>
                                    {a.pending === 1 ? 'Pending' : 'Done'} 
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}