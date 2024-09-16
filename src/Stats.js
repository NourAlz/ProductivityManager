import React, {Component} from 'react';
import { GENERALAPI } from './API';

import { Chart } from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';

export class Stat extends Component{
  constructor(props){
    super(props);

    this.state ={
      done: [],
      countdone: [],
      countpending: []
    };
  }

  /*This page has 3 refresh type of methods, the first one calls the ViewDoneCount API method, which returns the days, along 
    with the count of done tasks for that day. The second one calls the ViewPendingCount API method, just like the one above it
    with the count of pending tasks for the day. The array is basically a map format: {[day, count], [day2, count2], ...}
    The refreshList functions the same as in All.js page.
  */

  refreshDoneCount(){
    fetch(GENERALAPI.API_URL + 'Tasks/ViewDoneCount')
    .then(response=>response.json())
    .then(data=>{
      this.setState({countdone:data});
    });
  }

  refreshPendingCount(){
    fetch(GENERALAPI.API_URL + 'Tasks/ViewPendingCount')
    .then(response=>response.json())
    .then(data=>{
      this.setState({countpending:data});
    });
  }

  refreshList(){
    fetch(GENERALAPI.API_URL + 'Tasks/ViewDone')
    .then(response=>response.json())
    .then(data=>{
        this.setState({done:data});
    });
  }

  componentDidMount(){
      this.refreshList();
      this.refreshDoneCount();
      this.refreshPendingCount();
  }

  /*This method calls the Delete API method, which is responsible of deleting all the records of tasks labeled as done.*/
  clearRecord() {
    fetch(GENERALAPI.API_URL + 'Tasks/Delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      this.refreshList();         
      this.refreshDoneCount();     
      this.refreshPendingCount();  
    })
    .catch((error) => console.error('Error:', error));
  }

  /*The render function first defines 3 const objects related for the Bar element, imported from the ChartJS library.
    The Bar element takes labels for the x-axis, an array of strings. Then the datasets take as many sets, arrays of integers.
    So the labels here are the date days, and the datasets are the number of tasks done and pending. The Bar element then displays
    a bar chart with the data provided.
    The table displays the tasks done, along with a disabled checkbox. The button below is for deleting the records if wanted.
  */
  render(){
    const{
        done,
        countdone,
        countpending,
    }=this.state;

    const days = countdone.map(item => item.date_day.split('T')[0]);
    const numdone = countdone.map(item => item.number);
    const numpend = countpending.map(item => item.number);

    return(
        <div>
            <h3 className='d-flex justify-content-center m-3'>
                Achieved Goals
            </h3>

            <h4 className='d-flex justify-content-center m-3'>
              "Remember that progress is not linear. Be proud of your small steps."
            </h4>

            <div style={{
              height: '300px',
              margin: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Bar
                data = {{
                  labels: days,
                  datasets: [
                    {
                      label: 'Tasks Done',
                      data: numdone,
                    },
                    {
                      label: 'Tasks Pending',
                      data: numpend
                    }
                  ]
                }}
              />
            </div>

            <table className='table table-light table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th>Done Tasks</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {done.map(d=>
                        <tr key={d.Task}>
                            <td>{d.todo}</td>
                            <td>
                                <input
                                  type='checkbox'
                                  checked = {true}
                                  disabled = {true}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px'}}>
              <button className="btn btn-danger" onClick={this.clearRecord}> Clear Record </button>
            </div>
        </div>
    )
  }
}