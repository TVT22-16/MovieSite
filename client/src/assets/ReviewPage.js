import React from 'react';
import Reviews from '../components/Reviews';


const ReviewPage = () => {


  return (

    <div style={{display:'flex',flexDirection:'column',alignItems:'center', width:'100%',height:'auto', margin:'auto auto', gap:'20px'}}>

        <div style={{display:'flex',flexDirection:'column', width:'80%',gap:'20px',marginTop:'1%'}}>
            <Reviews/>
        </div>

        
    </div>
  );
};



export default ReviewPage;
