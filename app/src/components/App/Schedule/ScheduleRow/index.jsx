// ScheduleRow

import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/actions'
// import * as selectors from '../../../../store/selectors';
import styles from './style.css'

const ScheduleRow = ({ member }) => {
  const renderItems = (
    <div className={styles.row}>
      <div className={styles.memberDetail}> {member.memberId} </div>
      <div className={styles.memberDetail}> {member.sequence} </div>
      <div className={styles.memberDetail}> {member.firstName} </div>
      <div className={styles.memberDetail}> {member.lastName} </div>
      <div className={styles.memberDetail}> {member.lastServedDate} </div>
      <div className={styles.memberDetail}> {member.lastRoleId} </div>
      <div className={styles.memberDetail}> {member.lastRoleName} </div>
    </div>
  )
  return (
    <div>
      {renderItems}
    </div>
  )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, actionCreators)(ScheduleRow);
