import { connect } from 'react-redux'
import { injectReducer } from 'STORE/reducers'
import Message from 'COMPONENT/Message'
import Phone from 'COMPONENT/Phone'
import { setname } from './store/user'

export default (store) => ({
  path : 'user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const User = require('./containers/userContainer').default
      const reducer = require('./store/user').default
      injectReducer(store, { key: 'user', reducer })
      cb(null, User)
    }, 'user')
  },

  indexRoute: { // 对应 Message
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connect(
          (state) => ({ mine : state.user.mine }), 
          { setname }
        )(Message))
      }, 'message')
    }
  },

  childRoutes: [
  { // 对应 Phone
    path: 'phone',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, Phone)
      }, 'phone')
    },
    onEnter: () => console.log('用户认证！')
  }]

})