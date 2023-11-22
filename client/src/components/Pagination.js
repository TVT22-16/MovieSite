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
        <div className='pageComponent'>
            <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" onClick={handlePagePrevious}>Previous</a></li>
                <li className="page-item"><a className="page-link" onClick={handlePageNext}>Next</a></li>
            </ul>
            </nav>
        </div>
     );
}
 
export default PaginationComponent;


