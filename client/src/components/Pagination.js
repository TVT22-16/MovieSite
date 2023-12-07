// PaginationComponent.js
import React from 'react';
import './Movies.css';


const PaginationComponent = (props) => {

    


    const handlePageNext  = () => {
        if(props.page < props.responsePageAmount){
            console.log('handle page next');
            props.updatePage(props.page+1);
        }
    }
     
    const handlePagePrevious  = () => {
        if(props.page > 1){
            console.log('handle page previos');
            props.updatePage(props.page-1);
        }

    }
    
    return ( 

            <ul style={{cursor:'pointer', margin:'auto auto', scale:'0.8',display:'flex'}} className="pagination">
                <li className="page-item"><a className="page-link" onClick={handlePagePrevious}>Previous</a></li>
                <li className="page-item"><a className="page-link" onClick={handlePageNext}>Next</a></li>
            </ul>

     );
}
 
export default PaginationComponent;


