import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ClientRole,
  ChannelProfile,
} from 'react-native-agora';
import {IconButton, TextInput} from 'react-native-paper'
import requestCameraAndAudioPermission from './components/Permission';
import styles from './components/Style';
import ShowCatalog from './components/ShowCatalog ';

/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property channelName Channel Name for the current session
 */
const token = '006645930a984ae45c5831d9ecc05e5e675IAAPK0w/+WUgRUDCw+GUvuuTQAU6KfR7oxdk/yqatFS2WazTKhAAAAAAEAAZVNxr7xaeYQEAAQDvFp5h';
const appId = '645930a984ae45c5831d9ecc05e5e675';
const channelName = 'tst2';

/**
 * @property isHost Boolean value to select between broadcaster and audience
 * @property joinSucceed State variable for storing success
 * @property peerIds Array for storing connected peers
 */
interface State {
  isHost: boolean;
  joinSucceed: boolean;
  peerIds: number[];
  messages:any[];
  txtmsg:string;
  isbuttonshow:boolean;
}

export default class App extends Component<null, State> {
  _engine?: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      isHost: true,
      joinSucceed: false,
      peerIds: [],
      isbuttonshow:false
      ,messages:[{
        _id:1
        ,text:"Hi",
        user:{_id:2,name:'Abhishek Yadav'},
        createdAt:new Date()
        
      },
      {_id:2,
        text:"looks amazing",
        user:{_id:1,name:'Abhishek Yadav'},
        createdAt:new Date()
      }, {_id:5,
        text:"Purchased '1 Chicken Jenga'",
        user:{_id:1,name:'Hema K'},
        createdAt:new Date()
      },
      {_id:4,
        text:"I want to buy one too",
        user:{_id:2,name:'Mitali Lakhera'},
        createdAt:new Date()
        
      },
     
      {_id:7,
        text:"can hear you",
        user:{_id:2,name:'Mitali Lakhera'},
        createdAt:new Date()
        
      },
      {_id:0,
        text:"is White color available",
        user:{_id:1,name:'Rahul Kumar'},
        createdAt:new Date()
      },
      {_id:8,
        text:"love this",
        user:{_id:2,name:'Monu Sharma'},
        createdAt:new Date()
        
      },
      {_id:9,
        text:"Bro",
        user:{_id:1,name:'Abhishek Yadav'},
        createdAt:new Date()
      },
      {_id:3,
        text:"nice Bro",
        user:{_id:2,name:'Umesh Singh'},
        createdAt:new Date()
        
      },
      ],
      txtmsg:'',
      
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
    this.setState({isbuttonshow:true})
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false,isbuttonshow:false });
  };

  render() {

    return (
      <View style={styles.max}>
      
        <View style={styles.max}>
          <Text style={styles.roleText}>
            You're {this.state.isHost ? 'a broadcaster' : 'the audience'}
          </Text>
          {this.state.isbuttonshow?<></>:<View style={this.state.isbuttonshow?[styles.buttonHolder,{justifyContent:'flex-start',alignItems:'flex-start'}]:styles.buttonHolder}>
                     {this.state.isbuttonshow? <IconButton icon="close" onPress={()=>{this.endCall()}} size={20} color="blue"/>
            :<><TouchableOpacity onPress={this.toggleRoll} style={styles.button}>
                <Text style={styles.buttonText}> Toggle Role </Text>
              </TouchableOpacity><TouchableOpacity onPress={this.startCall} style={styles.button}>
                  <Text style={styles.buttonText}> Start Call </Text>
                </TouchableOpacity><TouchableOpacity onPress={this.endCall} style={styles.button}>
                  <Text style={styles.buttonText}> End Call </Text>
                </TouchableOpacity></>}
          </View>}
          {this._renderVideos()}
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {navigation} =this.props;
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <ScrollView contentContainerStyle={{flexGrow:1}} style={{flex:1}}>
      <View style={styles.fullView}>
        {this.state.isHost ? (
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
          />
        ) : (
          <></>
        )}
        {this._renderRemoteVideos()}
       
        {this._renderlivechats()}
        <IconButton size={30} color={'blue'} icon="close-circle-outline"onPress={()=>{this.endCall()}}  style={{position:'absolute', top:-5,left:0}}/>

        <ShowCatalog navigation={navigation}/>
      </View></ScrollView>
    ) : null;
  };

  //handel send event on chat section
  onsend = async(value:string)=>{
    if(value.length!=0){
      //create a message dict.
      const msg = {_id:11,
        text:value,
      user:{_id:2,name:"Abhi Ydv"},
      createdAt:new Date()};
      //push message in list of messages <-->note- i use  "async await" because it was not working properly before <-->
     await this.setState({messages:[...this.state.messages,msg],txtmsg:''});
    
    }
    }

  _renderlivechats=()=>{
    const {messages,txtmsg}=this.state;
    const clrs =['#4e8ef5','#9d1ed4','#d41eb8','#e82063','#a1bd15','#9d1ed4','#a1bd15','#9d1ed4','#d41eb8','#e82063','#a1bd15'];
    console.log(clrs[2]);
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
            <View key={message._id} style={{flex:1,justifyContent:'flex-start',paddingHorizontal:8,}}>
           <View style={{flex:1,flexDirection:'row',height:20}}><View style={{width:35,height:35,backgroundColor:clrs[message._id],borderRadius:50,marginRight:5,justifyContent:'center'} } ><Text style={{color:'white', fontSize:18,fontWeight:'700',textAlign:'center'}}>{(message.user.name[0]).toUpperCase()}</Text></View><Text style={{fontSize:18,color:'white',fontWeight:'600'}}>{message.user.name}</Text></View>
            <Text style={{fontSize:16,marginLeft:40 ,fontWeight:'500' ,color:'white'}}>{message.text}</Text>      
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