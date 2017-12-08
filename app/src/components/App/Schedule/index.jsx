// ScheduleList
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import ScheduleRow from './ScheduleRow'
import makeSchedule from './makeSchedule'
import createScheduleList from './createScheduleList'
// import * as ku from '../../../lib/ke-utils'

class Schedule extends Component {
  componentDidMount() {
    this.props.requestReadScheduleMembers()
    this.props.requestReadExclusions()
    this.props.requestReadRoles()
  }

  handleSelectMember = (roleId, memberId) => {
    this.props.setSchedule({
      [roleId]: memberId === '' ? undefined : +memberId
    })
  }

  handleAutoSchedule = (scheduleList, roles) => {
    const schedule = makeSchedule(scheduleList, roles)
    this.props.setSchedule(schedule)
  }

  render() {
    const { scheduleMembers, roles, exclusions, upcomingSchedule } = this.props
    // ku.log('Schedule: scheduleMembers', scheduleMembers, 'blue')
    // ku.log('Schedule: roles', roles, 'blue')
    // ku.log('Schedule: exclusions', exclusions, 'blue')
    // ku.log('upcomingSchedule', upcomingSchedule, 'blue')

    const scheduleList = createScheduleList(scheduleMembers, roles, exclusions)

    const renderList = roles.map((r, index) => (
      <ScheduleRow
        key={index}
        role={r}
        memberId={upcomingSchedule[r.role_id] || ''}
        scheduleList={scheduleList}
        selectMember={this.handleSelectMember}
      />
    ))
    // ku.log('Schedule: scheduleList', scheduleList, 'blue')
    return (
      <div id='schedule' className={styles.schedule}>
        <h1 className={styles.title}>Volunteer Schedule for [date] </h1>
        <div className={styles.row}>
          <div className={styles.memberDetail}>role</div>
          <div className={styles.memberDetail}>member</div>
          <div className={styles.memberDetail}>lastRole</div>
          <div className={styles.memberDetail}>comment</div>
          <div className={styles.memberDetail}>contact</div>
        </div>
        {renderList}
        <button onClick={(e) => this.handleAutoSchedule(scheduleList, roles)}>
          Auto Schedule
        </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const o = {
    scheduleMembers: selectors.getScheduleMembers(state),
    roles: selectors.getRoles(state),
    exclusions: selectors.getExclusions(state),
    upcomingSchedule: selectors.getUpcomingSchedule(state)
  }
  return o
}
export default connect(mapStateToProps, actionCreators)(Schedule)
