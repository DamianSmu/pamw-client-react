import { Client} from '@stomp/stompjs';
import authHeader from '../auth-header';

export default class WebsocketService {
  static instance;

  constructor() {
    this.webSocketUrl = process.env.REACT_APP_WEBSOCKET_URL

    this.isConnected = false;
    this.client = new Client({
      brokerURL: this.webSocketUrl,
      connectHeaders: authHeader(),
      debug: function (str) {
        console.log('WS debug: ', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    

    this.client.onConnect = () => {
      this.isConnected = true;
      this.onConnectCb && this.onConnectCb();
    };

    this.client.onDisconnect = () => {
      this.isConnected = false;
      this.onDisconnectCb && this.onDisconnectCb();
    };

    this.client.onStompError = (frame) => {
      console.error('WS: Broker reported error: ' + frame.headers['message']);
      console.error('WS: Additional details: ' + frame.body);
      this.onErrorCb && this.onErrorCb();
    };
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new WebsocketService();
      return this.instance;
    }
    return this.instance;
  }


  connect(onConnectCb, onDisconnectCb, onErrorCb) {
    this.onConnectCb = onConnectCb;
    this.onDisconnectCb = onDisconnectCb;
    this.onErrorCb = onErrorCb;
    this.client.activate();
  }


  disconnect(){
    this.client.deactivate();
  }

  subscribe(destination, cb) {
    this.client.subscribe(destination, cb);
  }

  sendMessage(destination, body) {
    this.client.publish({ destination, body });
  }
}