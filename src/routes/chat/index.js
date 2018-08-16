import React, { Component } from 'react';
import logo from '../../../src/logo.svg';
import './chat.css';
import { version } from './package.json'
import { UserHeader } from '../../Components/chat/UserHeader';
import { UserList } from '../../Components/chat/UserList';
import { MessageList } from '../../Components/chat/MessageList';
import { TypingIndicator } from '../../Components/chat/TypingIndicator';
import { CreateMessageForm } from '../../Components/chat/CreateMessageForm';
import { RoomList } from '../../Components/chat/RoomList';
import { RoomHeader } from '../../Components/chat/RoomHeader';
import { CreateRoomForm } from '../../Components/chat/CreateRoomForm';
import { WelcomeScreen } from '../../Components/chat/WelcomeScreen';
import { JoinRoomScreen } from '../../Components/chat/JoinRoomScreen';
import Chatkit from '@pusher/chatkit';


// --------------------------------------
// Authentication
// --------------------------------------

window.localStorage.getItem('chatkit-user') &&
    !window.localStorage.getItem('chatkit-user').match(version) &&
    window.localStorage.clear();

//const params = new URLSearchParams(window.location.search.slice(1));
const authCode = 'fb23e67f-c1d7-4cf4-b765-3418d7435bdc:4xKcEYsKNZ10FRGpJdTbBvcc4jDJvM64ZG08qQWetG4=';
const instance = 'v1:us1:a5f41850-d55a-4b17-9826-f1bdfe22240e';
const existingUser = window.localStorage.getItem('chatkit-user');
const CHATKIT_TOKEN_PROVIDER_ENDPOINT =
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a5f41850-d55a-4b17-9826-f1bdfe22240e/token";
const CHATKIT_ROOM_ID = 13262152;
// const authRedirect = () => {
//   const client = 'fb23e67f-c1d7-4cf4-b765-3418d7435bdc:4xKcEYsKNZ10FRGpJdTbBvcc4jDJvM64ZG08qQWetG4=';
//   const url =`https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a5f41850-d55a-4b17-9826-f1bdfe22240e`;
//   //const server = 'https://chatkit-demo-server.herokuapp.com';
//   //const redirect = `${server}/success?url=${window.location.href.split('?')[0]}`;
//   window.location = `${url}`;

//   //https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a5f41850-d55a-4b17-9826-f1bdfe22240e/token
// }

export class Chat extends Component {
    state = {
        name: '',
        user: {},
        room: {},
        messages: {},
        typing: {},
        sidebarOpen: false,
        userListOpen: window.innerWidth > 1000,
    }

    actions = {
        // --------------------------------------
        // UI
        // --------------------------------------

        setSidebar: sidebarOpen => this.setState({ sidebarOpen }),
        setUserList: userListOpen => this.setState({ userListOpen }),

        // --------------------------------------
        // User
        // --------------------------------------

        setUser: user => this.setState({ user }),

        // --------------------------------------
        // Room
        // --------------------------------------

        setRoom: room => {
            this.setState({ room, sidebarOpen: false })
            this.actions.scrollToEnd()
        },

        removeRoom: room => this.setState({ room: {} }),

        joinRoom: room => {
            this.actions.setRoom(room)
            this.actions.subscribeToRoom(room)
            this.state.messages[room.id] &&
                this.actions.setCursor(
                    room.id,
                    Object.keys(this.state.messages[room.id]).pop()
                )
        },

        subscribeToRoom: room =>
            !this.state.user.roomSubscriptions[room.id] &&
            this.state.user.subscribeToRoom({
                roomId: room.id,
                hooks: { onNewMessage: this.actions.addMessage },
            }),

        createRoom: options =>
            this.state.user.createRoom(options).then(this.actions.joinRoom),

        createConvo: options => {
            if (options.user.id !== this.state.user.id) {
                const exists = this.state.user.rooms.find(
                    x =>
                        x.name === options.user.id + this.state.user.id ||
                        x.name === this.state.user.id + options.user.id
                )
                exists
                    ? this.actions.joinRoom(exists)
                    : this.actions.createRoom({
                        name: this.state.user.id + options.user.id,
                        addUserIds: [options.user.id],
                        private: true,
                    })
            }
        },

        addUserToRoom: ({ userId, roomId = this.state.room.id }) =>
            this.state.user
                .addUserToRoom({ userId, roomId })
                .then(this.actions.setRoom),

        removeUserFromRoom: ({ userId, roomId = this.state.room.id }) =>
            userId === this.state.user.id
                ? this.state.user.leaveRoom({ roomId })
                : this.state.user
                    .removeUserFromRoom({ userId, roomId })
                    .then(this.actions.setRoom),

        // --------------------------------------
        // Cursors
        // --------------------------------------

        setCursor: (roomId, position) =>
            this.state.user
                .setReadCursor({ roomId, position: parseInt(position, 10) })
                .then(x => this.forceUpdate()),

        // --------------------------------------
        // Messages
        // --------------------------------------

        addMessage: payload => {
            const roomId = payload.room.id
            const messageId = payload.id
            // Update local message cache with new message
            this.setState({ 'messages': payload })
            // Update cursor if the message was read
            if (roomId === this.state.room.id) {
                const cursor = this.state.user.readCursor({ roomId }) || {}
                const cursorPosition = cursor.position || 0
                cursorPosition < messageId && this.actions.setCursor(roomId, messageId)
                this.actions.scrollToEnd()
            }
            // Send notification
            this.actions.showNotification(payload)
        },

        runCommand: command => {
            const commands = {
                invite: ([userId]) => this.actions.addUserToRoom({ userId }),
                remove: ([userId]) => this.actions.removeUserFromRoom({ userId }),
                leave: ([userId]) =>
                    this.actions.removeUserFromRoom({ userId: this.state.user.id }),
            }
            const name = command.split(' ')[0]
            const args = command.split(' ').slice(1)
            const exec = commands[name]
            exec && exec(args).catch(console.log)
        },

        scrollToEnd: e =>
            setTimeout(() => {
                const elem = document.querySelector('#messages')
                elem && (elem.scrollTop = 100000)
            }, 0),

        // --------------------------------------
        // Typing Indicators
        // --------------------------------------

        isTyping: (room, user) =>
            this.setState({ 'typing': room, user }, { sidebarOpen: true }),

        notTyping: (room, user) =>
            this.setState({ 'typing': { 0: 0 } }),

        // --------------------------------------
        // Presence
        // --------------------------------------

        setUserPresence: () => this.forceUpdate(),

        // --------------------------------------
        // Notifications
        // --------------------------------------

        showNotification: message => {
            if (
                'Notification' in window &&
                this.state.user.id &&
                this.state.user.id !== message.senderId &&
                document.visibilityState === 'hidden'
            ) {
                const notification = new Notification(
                    `New Message from ${message.sender.id}`,
                    {
                        body: message.text,
                        icon: message.sender.avatarURL,
                    }
                )
                notification.addEventListener('click', e => {
                    this.actions.joinRoom(message.room)
                    window.focus()
                })
            }
        },
    }

    componentDidMount() {
        const tokenProvider = new Chatkit.TokenProvider({
            url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        });

        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instance,
            userId: 'hnadmin',
            tokenProvider: tokenProvider
        });

        
        chatManager.connect({
            onUserStartedTyping: this.actions.isTyping,
            onUserStoppedTyping: this.actions.notTyping,
            onAddedToRoom: this.actions.subscribeToRoom,
            onRemovedFromRoom: this.actions.removeRoom,
            onUserCameOnline: this.actions.setUserPresence,
            onUserWentOffline: this.actions.setUserPresence,
        }).then(currentUser => {
            this.setState({ user: currentUser });

            window.localStorage.setItem('chatkit-user', JSON.stringify(currentUser));
            window.history.replaceState(null, null, window.location.pathname);
            //chatManager(this, currentUser);

            currentUser.subscribeToRoom({
                roomId: CHATKIT_ROOM_ID,
                hooks: {
                    onNewMessage: this.onReceive.bind(this)
                }
            });
        });

        // 'Notification' in window && Notification.requestPermission()
        // existingUser
        //   ? ChatManager(this, JSON.parse(existingUser))
        //   : fetch('https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a5f41850-d55a-4b17-9826-f1bdfe22240e/token', {
        //     method: 'POST',
        //     body: JSON.stringify({ code: authCode }),
        //   })
        //     .then(res => res.json())
        //     .then(user => {
        //       user.version = version;
        //       window.localStorage.setItem('chatkit-user', JSON.stringify(user));
        //       window.history.replaceState(null, null, window.location.pathname);
        //       ChatManager(this, user);
        //     })
    }

    onReceive(data) {
        const { id, senderId, text, createdAt } = data;
        const incomingMessage = {
            _id: id,
            text: text,
            createdAt: new Date(createdAt),
            user: {
                _id: senderId,
                name: senderId,
                avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
            }
        };

    }

    onSend([message]) {
        this.currentUser.sendMessage({
            text: message.text,
            roomId: CHATKIT_ROOM_ID
        });
    }

    render() {
        const {
            user,
            room,
            messages,
            typing,
            sidebarOpen,
            userListOpen,
        } = this.state
        const { createRoom, createConvo, removeUserFromRoom } = this.actions
        // if ( authRedirect())
        return (
            <div className="componentView">
                    <h1>ChatKit Example</h1>
                <main>
                
                    <aside data-open={sidebarOpen}>
                       
                        <UserHeader user={user} />
                        <RoomList
                            user={user}
                            rooms={user.rooms}
                            messages={messages}
                            typing={typing}
                            current={room}
                            actions={this.actions}
                        />
                        {user.id && <CreateRoomForm submit={createRoom} />}
                     
                    </aside>
                    <section>
                        <RoomHeader state={this.state} actions={this.actions} />
                        {room.id ? (
                            <row->
                                <col->
                                    <MessageList
                                        user={user}
                                        messages={messages[room.id]}
                                        createConvo={createConvo}
                                    />
                                    <TypingIndicator typing={typing[room.id]} />
                                    <CreateMessageForm state={this.state} actions={this.actions} />
                                </col->
                                {userListOpen && (
                                    <UserList
                                        room={room}
                                        current={user.id}
                                        createConvo={createConvo}
                                        removeUser={removeUserFromRoom}
                                    />
                                )}
                            </row->
                        ) : user.id ? (
                            <JoinRoomScreen />
                        ) : (
                                    <WelcomeScreen />
                                )}
                    </section>
                    
                </main>

            </div>
        );



    }
}

