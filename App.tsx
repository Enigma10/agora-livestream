import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import {Button, Colors, IconButton, TextInput} from 'react-native-paper';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  
 
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ClientRole,
  ChannelProfile,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './components/Permission';
import styles from './components/Style';

/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property channelName Channel Name for the current session
 */
const token = '006ddf855c87b174eb3ad9895dde7da3c2aIADp7kdkQyxXGOyw3RUoc8BEgWErRWvuMqOjiHNWs6Pq5AZa8+gAAAAAEAAxeNCcdDWWYQEAAQB0NZZh';
const appId = 'ddf855c87b174eb3ad9895dde7da3c2a';
const channelName = 'testing';

/**
 * @property isHost Boolean value to select between broadcaster and audience
 * @property joinSucceed State variable for storing success
 * @property peerIds Array for storing connected peers
 * @property txtmsg-> to store inputText value of chat section
 * @property isbuttonShow - to handel buttons view in different states
 * 
 */
interface State {
  isHost: boolean;
  joinSucceed: boolean;
  peerIds: number[];
  txtmsg:string;
  messages: any[];
  isbuttonShow:boolean;
}

export default class App extends Component<null, State> {
  _engine?: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      isHost: true,
      joinSucceed: false,
      peerIds: [],
      txtmsg:'',
      isbuttonShow:true
      //@messages - intital list of initial messages prototype that shows in chat section
      ,messages:[{
        _id:21
        ,text:"hello",
        user:{_id:2,name:'abhishekY Adav'},
        createdAt:new Date()
        
      },
      {_id:22,
        text:"hello",
        user:{_id:1,name:'abhishekY Adav'},
        createdAt:new Date()
      },
      {_id:244,
        text:"hello",
        user:{_id:2,name:'abhishekY Adav'},
        createdAt:new Date()
        
      },
      {_id:54,
        text:"hello",
        user:{_id:1,name:'abhishekY Adav'},
        createdAt:new Date()
      },
      {_id:57,
        text:"hello",
        user:{_id:2,name:'abhishekY Adav'},
        createdAt:new Date()
        
      },
      {_id:4334,
        text:"hello",
        user:{_id:1,name:'abhishekY Adav'},
        createdAt:new Date()
      },
      {_id:4443,
        text:"hello",
        user:{_id:2,name:'abhishekY Adav'},
        createdAt:new Date()
        
      },
      {_id:3234,
        text:"hello",
        user:{_id:1,name:'abhishekY Adav'},
        createdAt:new Date()
      },
      {_id:2223,
        text:"hello",
        user:{_id:2,name:'abhishekY Adav'},
        createdAt:new Date()
        
      },
      {_id:878,
        text:"hello",
        user:{_id:1,name:'abhishekY Adav'},
        createdAt:new Date()
      },]
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();
    await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine?.setClientRole(
      this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
    );

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  /**
   * @name toggleRoll
   * @description Function to toggle the roll between broadcaster and audience
   */
  toggleRoll = async () => {
    // Join Channel using null token and channel name
    this.setState(
      {
        isHost: !this.state.isHost,
      },
      async () => {
        await this._engine?.setClientRole(
          this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
        );
      }
    );
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(token, channelName, null, 0);
    this.setState({isbuttonShow:false});
  
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
  };


  render() {
    return (
      <View style={styles.max}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.max}>
          <Text style={styles.roleText}>
            You're {this.state.isHost ? 'a broadcaster' : 'the audience'}
          </Text>
          {this.state.isbuttonShow?<View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.toggleRoll} style={styles.button}>
              <Text style={styles.buttonText}> Toggle Role </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.startCall} style={styles.button}>
              <Text style={styles.buttonText}> Start Call </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View>:<></>}
          {this._renderVideos()}
        </View>
        </ScrollView>
      </View>
    );
  }

  //handel send event on chat section
 onsend = async(value:string)=>{
if(value.length!=0){
  //create a message dict.
  const msg = {_id:432,
    text:value,
  user:{_id:2,name:"Abhi Ydv"},
  createdAt:new Date()};
  //push message in list of messages <-->note- i use  "async await" because it was not working properly before <-->
 await this.setState({messages:[...this.state.messages,msg],txtmsg:''});

}
}


  _renderVideos = () => {
    const {joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <View style={styles.videview}>
        {this.state.isHost ? (
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
          />
        ) : (
          <></>
        )}

        </View>
        {this._renderlivechats()}
      </View>
    ) : null;
  };
  _renderlivechats=()=>{
const {messages,txtmsg}=this.state;
return(
  
  <View style={styles.chatView}>
    <LinearGradient 
  colors={['transparent' ,'black']} 
  style={{flex:1}}>
    <View style={{flex:1}}>
    <ScrollView scrollEnabled contentContainerStyle={{ flexGrow: 1 }}>
   
    <View style={{flex:1}}>
      {messages.map((message)=>{
      return(
        <View key={message._id} style={{flex:1,paddingHorizontal:5,}}>
        <Text style={{fontSize:18,color:'white',fontWeight:'600'}}>{message.user.name}</Text>
        <Text style={{fontSize:16, fontWeight:'500' ,color:'white'}}>{message.text}</Text>      
            </View>
      );
    })}
    
    </View>

    </ScrollView>{// <-->Note - if Icons is not working try  react native link and rebuild app <-->
    }
    <View style={{flexDirection:'row'}}><TextInput placeholder="Enter your message" style={styles.inputtext}  value={txtmsg} onChangeText={(val)=>{this.setState({txtmsg:val})}}/><IconButton onPress={()=>{this.onsend(txtmsg)}} size={30} icon="send" color="white"/></View>
    </View>
    </LinearGradient>
    
    
   

  </View>
)

  }


  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={styles.remoteContainerContent}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
