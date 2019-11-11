var root = document.body
        var garrettsLapCount = 2043

        var Layout = {
            view: function (vnode) {
                return [
                    m('.container', [
                        m('nav', [
                            m('ul', [
                                m('li', 'Mason Motorsports Facts'),
                                m('li', [
                                    m(m.route.Link, { href: '/rich' }, 'Rich')
                                ]),
                                m('li', [
                                    m(m.route.Link, { href: '/garrett' }, 'Garrett')
                                ]),
                                m('li', [
                                    m(m.route.Link, { href: '/eduardo' }, 'Eduardo')
                                ]),
                                m('li', [
                                    m(m.route.Link, { href: '/david' }, 'David')
                                ]),
                                m('li', [
                                    m(m.route.Link, { href: '/nick' }, 'Nick')
                                ])
                            ])
                        ]),
                        m('.vertical-center', vnode.children)
                    ])
                ]
            }
        }

        var NormalFact = {
            view: function (vnode) {
                return [
                    m('.label', vnode.attrs.label),
                    m('.text', vnode.attrs.text)
                ]
            }
        }

        var TimerToNowFact = {
            view: function (vnode) {
                var date = new Date()
                var now = date.getTime()
                var startDate = new Date(vnode.attrs.startDate)
                var start = startDate.getTime()
                var diff = now - start
                var timer = setTimeout(m.redraw, 1000)

                return [
                    m('.label', vnode.attrs.label),
                    m('.timerText', convertTimeFromMillisecondsToString(diff))
                ]
            }
        }

        var Rich = {
            view: function(vnode) {
                return [ 
                    m(TimerToNowFact, {
                        startDate: '2019-11-09 15:00',
                        label: 'Rich\'s curtains have been up for the past',
                    })
                ]
            }
        }

        var Eduardo = {
            view: function(vnode) {
                return [
                    m(TimerToNowFact, {
                        startDate: '2019-11-04 18:17:36',
                        label: 'Eduardo has been computerless for the past'
                    })
                ]
            }
        }

        var Garrett = {
            view: function(vnode) {
                return [
                    m(NormalFact, {
                        label: [ 'Garrett\'s ', m('em', 'Throw \'n Go'), ' efforts have already amounted to' ],
                        text: numberWithCommas(garrettsLapCount) + ' laps'
                    })
                ]
            }
        }

        var David = {
            view: function(vnode) {
                return [
                    m(NormalFact, {
                        label: 'David\'s middle name is actually',
                        text: 'Front Wheel Drive'
                    })
                ]
            }
        }

        var Nick = {
            view: function(vnode) {
                return [
                    m(NormalFact, {
                        label: 'Did you know that Nick has a trackmap of the Nordschleife imprinted on the inside of his eyelids?'
                    })
                ]
            }
        }

        m.route(root, '/rich', {
            '/rich': {
                render: function() {
                    return m(Layout, m(Rich))
                }
            },
            '/garrett': {
                render: function() {
                    return m(Layout, m(Garrett))
                }
            },
            '/eduardo': {
                render: function() {
                    return m(Layout, m(Eduardo))
                }
            },
            '/david': {
                render: function() {
                    return m(Layout, m(David))
                }
            },
            '/nick': {
                render: function() {
                    return m(Layout, m(Nick))
                }
            }
        })

        function convertTimeFromMillisecondsToString(from) {
            var seconds = Math.floor(from / 1000)
            var minutes = Math.floor(seconds / 60)
            var hours = Math.floor(minutes / 60)
            var days = Math.floor(hours / 24)
            seconds = seconds % 60
            minutes = minutes % 60
            hours = hours % 24

            var to = days + ((days == 1) ? " day, " : " days, ") + hours + ((hours == 1) ? " hour, " : " hours, ") + minutes + ((minutes == 1) ? " minute " : " minutes ") + "and " + seconds + ((seconds == 1) ? " second" : " seconds")

            return to
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }