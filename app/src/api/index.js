import { log } from '../lib/ke-utils'

export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url, options = {}) => (

  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  .then((res) => res.json())//I bet this .json does not need to be here
);

export default {
  schedule: {
    schedule(date) {
      return fetchJson(
        `/schedule/schedule/${date}`,
        { method: 'GET'}
      )
      .then((data) => {
        // log('api.schedule.schedule: typeof data', data.prototype.toString.call, 'yellow')
        log('api.schedule.schedule: data', data, 'yellow')
      })
      // .then((data) => {
      //   // ku.log('api.schedule.scheduleMembers: data', data, 'yellow')
      //   // const normalized = normalize(data, arrayOf(next6))
      //   // const o = {
      //   //   schedule: normalized.entities.next6 || {},
      //   //   ids: normalized.result,
      //   // }
      //   // ku.log('api.schedule.scheduleMembers: o', o, 'yellow')
      //   return data
      // })
    },
    roles() {
      return fetchJson(
        '/schedule/roles',
        { method: 'GET'}
      )
      .then((data) => {
        // log('api.schedule.roles: data', data, 'yellow')
        return data
      })
    },
    exclusions() {
      return fetchJson(
        '/schedule/exclusions',
        { method: 'GET'}
      )
      .then((data) => {
        return data
      })
    }
  },
  members: {
    create(member) {
      return fetchJson(
        '/members',
        {
          method: 'POST',
          body: JSON.stringify({ member })
        }
      );
    },
    read() {
      return fetchJson(
        '/members',
        { method: 'GET' }
      )
    },
    update(id, member) {
      //ku.log('api.members.update: id', id, 'orange')
      //ku.log('api.members.update: member', member, 'orange')
      return fetchJson(
        `/members/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ member })
        }
      );
    },
    delete(id) {
      return fetchJson(
        `/members/${id}`,
        {
          method: 'DELETE'
        }
      )
      .then((data) => {
        console.log(data)
        return data.affectedRows ? id : -1
      });
    },
  },
};
