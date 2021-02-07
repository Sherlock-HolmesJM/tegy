import React from 'react';

interface Props {}

function Tracker(props: Props) {
  // const {} = props

  return (
    <div className='Tracker'>
      {/* Tracker summary begins */}
      <div className='tracker-summary'>
        <div className='tracker-summary-child'>
          Available budget in %month% %year%
        </div>

        <div className='tracker-summary-child'>+ 0.00</div>

        <div className='tracker-summary-child tracker-income'>
          <div className='tracker-income-title'>income</div>
          <div className='tracker-income-amount'>+ 0.00</div>
        </div>

        <div className='tracker-summary-child tracker-expenses'>
          <div className='tracker-expenses-title'>expenses</div>
          <div className='tracker-expenses-amount'>- 0.00</div>
        </div>
      </div>
      {/* Tracker summary ends */}

      {/* Tracker input container begins */}
      <div className='tracker-input-container'>
        <select name='type' className='tracker-type' id='type'>
          <option value='1'>+</option>
          <option value='0'>-</option>
        </select>
        <input type='text' className='tracker-input-description' />
        <input type='number' min='0' className='tracker-input-amount' />
        {/* Submit Icon */}
      </div>
      {/* Tracker input container ends */}

      {/* Tracker details begins */}
      <div className='tracker-details'></div>
      {/* Tracker details ends */}
    </div>
  );
}

export default Tracker;
