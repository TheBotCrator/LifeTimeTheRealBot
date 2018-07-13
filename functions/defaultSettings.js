module.exports = {
  'prefix':'$',
  'modLog':'not-set',
  'muteRole':'not-set',
  'roleLog':'not-set',
  'msgLog':'not-set',
  'nickLog':'not-set',
  'serverLog':'not-set',
  'welcome_config':{
    'type':'text',
    'color':null,
    'message':'not-set',
    'footerMessage':'not-set',
    'enabled':false,
    'channel':'not-set'
  },
  'leave_config':{
    'type':'text',
    'color':null,
    'message':'not-set',
    'footerMessage':'not-set',
    'enabled':false,
    'channel':'not-set'
  },
  'disabled_commands':[],
  'embed':'default',
  'autorole':{
    'enabled':false,
    'role':'',
    'time':null
  },
  'ignored':{
    'channels':[],
    'roles':[],
    'users':[]
  },
  'automod':{
    'invite_links':{
      'allowed_roles':[],
      'allowed_users':[],
      'allowed_channels':[],
      'enabled':false,
      'action':null
    },
    'bad_words':{
      'allowed_roles': [],
      'allowed_users': [],
      'allowed_channels': [],
      'enabled': false,
      'action': null,
      'words':[]
    },
    'racial_slurs':{
      'allowed_roles': [],
      'allowed_users': [],
      'allowed_channels': [],
      'enabled': false,
      'action': null,
      'words': []
    },
    'nsfw':{
      'allowed_roles': [],
      'allowed_users': [],
      'allowed_channels': [],
      'enabled': false,
      'action': null,
      'words': []
    },
    'anti_spam':{
      'allowed_roles': [],
      'allowed_users': [],
      'allowed_channels': [],
      'enabled': false,
      'action': null,
      'time':null,
      'messages':null //messages to be sent within the time to trigger
    },
    'warn_punish':{
      'one_warn':null,
      'two_warns':null,
      'three_warns':null,
      'four_warns':null,
      'five_warns':null,
      'six_warns':null,
      'seven_warns':null,
      'eight_warns+':null
    }
  }
};
