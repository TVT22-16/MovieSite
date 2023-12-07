// PaginationComponent.js
import React from 'react';
import './Movies.css';
import { Badge } from 'react-bootstrap';


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

        <ul className="pagination justify-content-center" style={{ cursor: 'pointer', margin: 'auto auto', gap: '10px', scale: '0.9', display: 'flex' }}>

            <li className="page-item" style={{ padding: '1px', width: '50%' }}>
                <button className="btn btn-primary" onClick={handlePagePrevious}>{'<'}</button>
            </li>

            <Badge style={{ maxHeight: '100%', margin: 'auto auto', fontSize: '15px', padding: '10px' }}>{props.page}</Badge>

            <li className="page-item" style={{ width: '50%' }}>
                <button className="btn btn-primary" onClick={handlePageNext}>{'>'}</button>
            </li>

        </ul>

     );
}
 
export default PaginationComponent;


